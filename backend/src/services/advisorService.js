const { CurriculumKnowledge } = require('../models');
const fallbackKnowledge = require('../data/knowledge');

class AdvisorService {
  /**
   * 1. Get raw curriculum knowledge for a given academic year (1, 2, 3, or 4)
   */
  static async getCurriculumByYear(year) {
    const numericYear = parseInt(year, 10);
    if (![1, 2, 3, 4].includes(numericYear)) {
      throw new Error('Invalid academic year. Must be between 1 and 4.');
    }

    try {
      const doc = await CurriculumKnowledge.findOne({ year: numericYear });
      if (doc) return doc.toObject();
    } catch (err) {
      console.warn('[AdvisorService] MongoDB query failed, falling back to local JSON:', err.message);
    }

    // Fallback to local JSON files
    return fallbackKnowledge.getKnowledgeByYear(numericYear);
  }

  /**
   * 2. Generate a custom, tailored 4-week study plan and recommendation deck
   */
  static async generateStudyPlan(params) {
    const {
      year = 1,
      semester = 1,
      targetRole = 'Software Development Engineer (SDE)',
      skillLevel = 'Beginner',
      weeklyHours = 12,
      focusDomain = 'General CSE',
    } = params;

    const numericYear = parseInt(year, 10) || 1;
    const yearData = await this.getCurriculumByYear(numericYear);

    if (!yearData) {
      throw new Error(`Curriculum data not found for year ${numericYear}`);
    }

    // Curate books
    const allBooks = [];
    yearData.subjects?.forEach((subj) => {
      subj.recommendedBooks?.forEach((b) => {
        allBooks.push({
          ...b,
          subjectCode: subj.code,
          subjectName: subj.name,
        });
      });
    });

    // Curate courses
    const allCourses = [];
    yearData.subjects?.forEach((subj) => {
      subj.recommendedCourses?.forEach((c) => {
        allCourses.push({
          ...c,
          subjectCode: subj.code,
          subjectName: subj.name,
        });
      });
    });

    // Curate YouTube Playlists
    const allYouTube = [];
    yearData.subjects?.forEach((subj) => {
      subj.youtubePlaylists?.forEach((yt) => {
        allYouTube.push({
          ...yt,
          subjectCode: subj.code,
          subjectName: subj.name,
        });
      });
    });

    // Curate Projects
    const allProjects = yearData.recommendedProjects || [];

    // Role-specific focus mapping
    const roleFocusMap = {
      'Software Development Engineer (SDE)': {
        primarySubject: numericYear === 1 ? 'Programming for Problem Solving' : 'Data Structures & Algorithms',
        weeklyDSAHours: Math.round(weeklyHours * 0.45),
        weeklyDevHours: Math.round(weeklyHours * 0.35),
        weeklyTheoryHours: Math.round(weeklyHours * 0.20),
        advice: 'Prioritize strong algorithmic problem solving, clean code writing, and understanding memory mechanics.',
      },
      'Full-Stack Web Developer': {
        primarySubject: 'Web Foundations & Database Architecture',
        weeklyDSAHours: Math.round(weeklyHours * 0.30),
        weeklyDevHours: Math.round(weeklyHours * 0.50),
        weeklyTheoryHours: Math.round(weeklyHours * 0.20),
        advice: 'Build interactive user interfaces, master RESTful API contracts, and deploy full-stack apps with database persistence.',
      },
      'AI / Machine Learning Engineer': {
        primarySubject: numericYear === 1 ? 'Engineering Mathematics & Python' : 'Artificial Intelligence & ML',
        weeklyDSAHours: Math.round(weeklyHours * 0.25),
        weeklyDevHours: Math.round(weeklyHours * 0.45),
        weeklyTheoryHours: Math.round(weeklyHours * 0.30),
        advice: 'Focus heavily on Linear Algebra, Statistics, Data Manipulation (Pandas/NumPy), and Model evaluation metrics.',
      },
      'Cloud & DevOps Engineer': {
        primarySubject: 'Operating Systems & Cloud Infrastructure',
        weeklyDSAHours: Math.round(weeklyHours * 0.20),
        weeklyDevHours: Math.round(weeklyHours * 0.50),
        weeklyTheoryHours: Math.round(weeklyHours * 0.30),
        advice: 'Master Linux CLI, Docker containerization, CI/CD automated pipelines, and cloud services (AWS/GCP).',
      },
      'Cybersecurity & Network Analyst': {
        primarySubject: numericYear === 1 ? 'Digital Logic' : 'Computer Networks & Operating Systems',
        weeklyDSAHours: Math.round(weeklyHours * 0.20),
        weeklyDevHours: Math.round(weeklyHours * 0.40),
        weeklyTheoryHours: Math.round(weeklyHours * 0.40),
        advice: 'Deep dive into network protocols (TCP/IP, TLS), Linux permissions, cryptography, and OWASP web vulnerabilities.',
      },
    };

    const roleProfile = roleFocusMap[targetRole] || roleFocusMap['Software Development Engineer (SDE)'];

    // Generate 4-Week Dynamic Timetable
    const fourWeekSchedule = [
      {
        weekNumber: 1,
        title: 'Foundations, Environment & Core Syntax Mastery',
        theme: 'Theory & Setup',
        weeklyTargetHours: weeklyHours,
        milestone: 'Environment configured, GitHub repository initialized, first 15 practice problems completed.',
        dailyTasks: [
          { day: 'Day 1-2', task: `Read core chapters in ${allBooks[0]?.title || 'Standard Textbook'} (${allBooks[0]?.author || 'Authors'}).`, type: 'Reading' },
          { day: 'Day 3-4', task: `Watch playlist on ${allYouTube[0]?.topic || 'Core Subject'} by ${allYouTube[0]?.creator || 'Recommended Creator'}.`, type: 'Video' },
          { day: 'Day 5-6', task: `Start ${allCourses[0]?.title || 'Foundation Course'} on ${allCourses[0]?.platform || 'Coursera'}.`, type: 'Course' },
          { day: 'Day 7', task: 'Solve 5 logic problems and commit code to GitHub with descriptive messages.', type: 'Coding' },
        ],
      },
      {
        weekNumber: 2,
        title: 'Deep Concepts, Problem Solving & Data Structures',
        theme: 'Problem Solving & Deep Dive',
        weeklyTargetHours: weeklyHours,
        milestone: 'Core subject concepts understood; 25+ problems solved with optimal time/space complexity.',
        dailyTasks: [
          { day: 'Day 8-9', task: `Implement foundational algorithms/classes from ${allBooks[1]?.title || allBooks[0]?.title}.`, type: 'Coding' },
          { day: 'Day 10-11', task: `Complete Module 2 of ${allCourses[0]?.title || 'Coursera Certification'}.`, type: 'Course' },
          { day: 'Day 12-13', task: `Watch lecture on ${allYouTube[1]?.topic || allYouTube[0]?.topic} by ${allYouTube[1]?.creator || allYouTube[0]?.creator}.`, type: 'Video' },
          { day: 'Day 14', task: `Weekly Review: Dry-run algorithms and document edge cases in personal notes.`, type: 'Review' },
        ],
      },
      {
        weekNumber: 3,
        title: `Project Implementation: ${allProjects[0]?.title || 'Practical Engineering System'}`,
        theme: 'Hands-on Building',
        weeklyTargetHours: weeklyHours,
        milestone: 'Core project logic engineered with input validation, modular structure, and persistence.',
        dailyTasks: [
          { day: 'Day 15-16', task: `Architect ${allProjects[0]?.title || 'Project 1'}: Design schema/classes and setup Git repository.`, type: 'Architecture' },
          { day: 'Day 17-19', task: `Implement core CRUD and business logic using ${allProjects[0]?.techStack?.join(', ') || 'selected tech stack'}.`, type: 'Coding' },
          { day: 'Day 20-21', task: `Connect database/file storage and write unit tests for edge cases.`, type: 'Testing' },
        ],
      },
      {
        weekNumber: 4,
        title: 'Deployment, Portfolio Integration & Milestone Audit',
        theme: 'Polishing & Career Launch',
        weeklyTargetHours: weeklyHours,
        milestone: 'Project deployed live or uploaded to GitHub with complete documentation; 1-month sprint goal achieved.',
        dailyTasks: [
          { day: 'Day 22-24', task: `Write comprehensive GitHub README with architecture diagram, installation steps, and demo GIF.`, type: 'Documentation' },
          { day: 'Day 25-26', task: `Add project bullet points to resume using Google XYZ formula ("Accomplished [X] as measured by [Y] by doing [Z]").`, type: 'Career' },
          { day: 'Day 27-28', task: `Self-Assessment Audit against Year ${numericYear} Graduation Readiness Criteria.`, type: 'Audit' },
        ],
      },
    ];

    return {
      studentProfile: {
        academicYear: numericYear,
        academicLevel: yearData.academicLevel,
        semester,
        targetRole,
        skillLevel,
        weeklyHours,
        focusDomain,
      },
      phaseTitle: yearData.phaseTitle,
      overview: yearData.overview,
      keyGoals: yearData.keyGoals,
      roleStrategy: roleProfile,
      curatedResources: {
        books: allBooks.slice(0, 4),
        courses: allCourses.slice(0, 3),
        youtube: allYouTube.slice(0, 4),
        projects: allProjects.slice(0, 3),
      },
      fourWeekSchedule,
      hackathonAdvice: yearData.hackathonFYStrategy || yearData.internshipPrepBlueprint || yearData.placementHiringPipeline,
      sprintRoadmap: yearData.monthlySprintRoadmap,
    };
  }
}

module.exports = AdvisorService;
