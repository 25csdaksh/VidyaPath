const {
  User,
  Profile,
  UserProgress,
  ProjectProgress,
  RoadmapProgress,
  Bookmark,
  Roadmap,
  Project,
  InterviewQuestion,
  Book,
  Course,
  YouTubeResource,
  ChatConversation,
} = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

class AiService {
  /**
   * 1. Aggregate complete student context from MongoDB
   */
  static async getStudentContext(userId) {
    const [
      user,
      profile,
      userProgress,
      projectProgressList,
      roadmapProgressList,
      bookmarks,
    ] = await Promise.all([
      User.findById(userId).select('name email role'),
      Profile.findOne({ user: userId }).populate('skills', 'name category level'),
      UserProgress.findOne({ user: userId }),
      ProjectProgress.find({ user: userId }).populate('project', 'title slug difficulty category description technologyStack'),
      RoadmapProgress.find({ user: userId }).populate('roadmap', 'title year semester slug'),
      Bookmark.find({ user: userId }).limit(10).populate('resourceId'),
    ]);

    const studentSkills = profile?.skills
      ? profile.skills.map((s) => (typeof s === 'string' ? s : s.name))
      : [];

    const activeProjects = projectProgressList.map((p) => ({
      title: p.project?.title || 'Untitled Project',
      slug: p.project?.slug || '',
      category: p.project?.category || 'Full Stack',
      difficulty: p.project?.difficulty || 'Intermediate',
      status: p.status,
      customRepoUrl: p.customRepoUrl,
      liveDemoUrl: p.liveDemoUrl,
      completedMilestonesCount: p.completedMilestones?.length || 0,
      studentNotes: p.studentNotes || '',
    }));

    const readinessScores = userProgress?.readinessScores || {
      dsaScore: 20,
      coreCsScore: 30,
      projectsScore: 15,
      overallPlacementScore: 22,
    };

    return {
      studentName: user?.name || 'Engineer',
      semester: profile?.semester || 1,
      college: profile?.college || '',
      branch: profile?.branch || 'Computer Science and Engineering',
      graduationYear: profile?.graduationYear || 2026,
      careerGoal: profile?.careerGoal || 'Software Development Engineer (SDE-1)',
      targetRole: profile?.targetRole || 'Full Stack / Backend Engineer',
      targetCompanies: profile?.targetCompanies || ['Tier-1 Product Companies'],
      specialization: profile?.specialization || 'General CSE',
      skills: studentSkills,
      activeProjects,
      readinessScores,
      learningStreak: userProgress?.currentStreak || 0,
      practicedInterviewQuestionsCount: userProgress?.interviewPracticedQuestions?.length || 0,
      bookmarkCount: bookmarks?.length || 0,
    };
  }

  /**
   * 2. Retrieve relevant portal catalog items to ground AI responses
   */
  static async getPortalKnowledge(mode, context) {
    const [roadmaps, projects, interviewQuestions, books] = await Promise.all([
      Roadmap.find({ semester: context.semester, isActive: true }).limit(2).select('title semester year description careerPaths subjects'),
      Project.find({ status: 'Published' }).limit(6).select('title slug difficulty category description technologyStack problemStatement'),
      InterviewQuestion.find().limit(8).select('question category topic difficulty answer keyTakeaways commonPitfalls'),
      Book.find().limit(5).select('title authors category level officialUrl description'),
    ]);

    return {
      roadmaps,
      projects,
      interviewQuestions,
      books,
    };
  }

  /**
   * 3. Call External LLM (Google Gemini API) if configured
   */
  static async callGeminiApi(systemPrompt, userPrompt, conversationHistory = []) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
    if (!apiKey || apiKey.trim() === '' || apiKey.includes('placeholder')) {
      return null; // Trigger intelligent heuristic fallback
    }

    try {
      const contents = [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nStudent Inquiry:\n${userPrompt}` }],
        },
      ];

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1500,
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`[AI SERVICE] Gemini API responded with status ${response.status}`);
        return null;
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return reply || null;
    } catch (err) {
      console.warn('[AI SERVICE] Gemini API call error:', err.message);
      return null;
    }
  }

  /**
   * 4. Comprehensive Heuristic & Rule-Based Fallback Engine
   * Generates rich, authentic, portal-grounded answers without hallucinating
   */
  static generateHeuristicResponse(mode, prompt, context, portalKnowledge) {
    const name = context.studentName;
    const sem = context.semester;
    const goal = context.careerGoal;
    const targetRole = context.targetRole;
    const companies = context.targetCompanies.join(', ');
    const skillsList = context.skills.length > 0 ? context.skills.join(', ') : 'C++, Python, React, SQL';
    const activeProj = context.activeProjects[0];

    const promptLower = prompt.toLowerCase();

    // -------------------------------------------------------------
    // CAPABILITY 1: SKILL GAP EXPLANATION
    // -------------------------------------------------------------
    if (mode === 'SkillGap' || promptLower.includes('skill gap') || promptLower.includes('missing skill')) {
      const standardBackendStack = ['Distributed Systems', 'Redis Caching', 'Docker & Kubernetes', 'PostgreSQL / ACID Transactions', 'System Design & Load Balancing', 'Advanced DSA'];
      const missing = standardBackendStack.filter(
        (req) => !context.skills.some((s) => s.toLowerCase().includes(req.toLowerCase().slice(0, 4)))
      );

      return {
        reply: `### 📊 Personalized Skill Gap Analysis for ${name}

**Target Role**: ${targetRole}  
**Target Dream Companies**: ${companies}  
**Current Skills Logged**: ${skillsList}  
**Placement Readiness Scores**: DSA (${context.readinessScores.dsaScore}%) • Core CS (${context.readinessScores.coreCsScore}%) • Projects (${context.readinessScores.projectsScore}%)

---

#### 1. High-Priority Competency Gaps Identified:
${missing.map((m, i) => `* **${i + 1}. ${m}**: Required for Tier-1 technical interviews at ${companies}.`).join('\n')}

#### 2. Three-Phase Closure Strategy:
* **Phase 1 (Week 1–2: Fundamental Mastery)**: Master indexing, query planning, and connection pooling in PostgreSQL.
* **Phase 2 (Week 3–4: Distributed Primitives)**: Implement Redis caching with LRU eviction and token bucket rate limiting on your portfolio project.
* **Phase 3 (Week 5–6: Containerization & Cloud)**: Dockerize your microservices, configure multi-stage builds, and deploy with reverse proxy.

#### 3. Recommended Verified Portal Resources:
* **Textbook**: *Designing Data-Intensive Applications* by Martin Kleppmann & *Operating Systems: Three Easy Pieces* by Remzi Arpaci-Dusseau.
* **Portal Project**: Start the **Distributed Rate Limiter** or **Real-Time Code Editor** in our [Project Hub](/projects).`,
        suggestedActions: [
          { label: 'Explore Projects Hub', actionUrl: '/projects', type: 'PROJECT' },
          { label: 'View Recommended Textbooks', actionUrl: '/books', type: 'BOOK' },
          { label: 'Update Technical Skills', actionUrl: '/profile', type: 'PROFILE' },
        ],
      };
    }

    // -------------------------------------------------------------
    // CAPABILITY 2: PROJECT SUGGESTIONS & ARCHITECTURE
    // -------------------------------------------------------------
    if (mode === 'Projects' || promptLower.includes('project') || promptLower.includes('suggest project')) {
      const topProjects = portalKnowledge.projects.slice(0, 3);
      return {
        reply: `### 💻 Tier-1 Project Recommendations for ${targetRole}

Here are 3 industry-grade system design projects from our **Portal Project Hub** tailored to your semester (${sem}) and career goal:

---

${topProjects
  .map(
    (p, idx) => `#### ${idx + 1}. [${p.title}](/projects/${p.slug})
* **Category**: ${p.category} | **Difficulty**: ${p.difficulty}
* **Problem Statement**: ${p.problemStatement || p.description}
* **Core Technology Stack**: ${p.technologyStack ? `${p.technologyStack.backend || 'Node/Go'} • ${p.technologyStack.database || 'PostgreSQL'} • ${p.technologyStack.devops || 'Docker'}` : 'Modern Distributed Stack'}
* **Why Interviewers Love It**: Proves you understand concurrency, database indexing, and low-latency API contracts.`
  )
  .join('\n\n')}

---

#### 💡 Recommended Next Steps:
1. Navigate to the project page on the portal.
2. Track your live build stage (Idea ➔ Planning ➔ Building ➔ Deployed).
3. Link your GitHub repository in your student dashboard to boost your portfolio readiness score!`,
        suggestedActions: [
          { label: 'Browse All Projects', actionUrl: '/projects', type: 'PROJECT' },
          { label: 'Check Dashboard Tracker', actionUrl: '/dashboard', type: 'DASHBOARD' },
        ],
      };
    }

    // -------------------------------------------------------------
    // CAPABILITY 3: INTERVIEW PREPARATION & DRILLS
    // -------------------------------------------------------------
    if (mode === 'InterviewPractice' || promptLower.includes('interview') || promptLower.includes('question') || promptLower.includes('dsa')) {
      const sampleQuestions = portalKnowledge.interviewQuestions.slice(0, 3);
      return {
        reply: `### 🎯 High-Frequency Technical Interview Drill

**Student Target**: ${targetRole} @ ${companies}  
**Core Focus Topics**: DBMS, Operating Systems, Computer Networks, and DSA.

---

${sampleQuestions
  .map(
    (q, idx) => `#### Question ${idx + 1} (${q.category} • ${q.topic} • ${q.difficulty}):
**${q.question}**

* **Standard Answer Architecture**:
${q.answer.slice(0, 280)}...

* **Key Takeaway for the Interviewer**:
${q.keyTakeaways && q.keyTakeaways.length > 0 ? q.keyTakeaways.join('; ') : 'Demonstrate depth in memory trade-offs and complexity analysis.'}

* **Common Pitfall to Avoid**:
${q.commonPitfalls && q.commonPitfalls.length > 0 ? q.commonPitfalls.join('; ') : 'Do not jump straight to the code without discussing time and space complexity.'}`
  )
  .join('\n\n---\n\n')}

---

*👉 Tip: Mark these questions as practiced in the [Interview Practice Hub](/interviews) to automatically increase your placement readiness score!*`,
        suggestedActions: [
          { label: 'Open Interview Question Bank', actionUrl: '/interviews', type: 'INTERVIEW' },
          { label: 'Placement Strategy Guide', actionUrl: '/placement-hub', type: 'PLACEMENT' },
        ],
      };
    }

    // -------------------------------------------------------------
    // CAPABILITY 4: PROJECT EXPLANATION PRACTICE (MOCK GRILLING)
    // -------------------------------------------------------------
    if (mode === 'ProjectGrilling' || promptLower.includes('grill') || promptLower.includes('explain project')) {
      const projName = activeProj ? activeProj.title : 'Distributed Rate Limiter with Redis & Token Bucket';
      const projStatus = activeProj ? activeProj.status : 'Building';

      return {
        reply: `### 🎙️ Senior Staff Engineer Mock Technical Grilling

**Active Project Under Review**: **${projName}**  
**Build Stage**: \`${projStatus}\`  
**Candidate**: ${name} (${targetRole})

> *"Hello ${name}, I saw your project **${projName}** on your resume. Let's do a deep-dive into your architectural choices and failure modes."*

---

#### 🔥 Round 1: Architecture & Concurrency Trade-Offs
1. **Concurrency Control**: What happens when 10,000 concurrent requests hit your system at the exact same millisecond? How do you prevent race conditions and dirty reads without locking the entire table?
2. **Database Bottlenecks**: Why did you choose your specific database? What is your query indexing strategy for high-frequency writes?
3. **Data Loss & Failover**: If your primary database or Redis instance crashes unexpectedly, what is your fallback mechanism? How do you guarantee data consistency?

#### 🔥 Round 2: System Scalability
4. How would you scale this application from handling **1,000 requests/sec** to **100,000 requests/sec**? Where does the bottleneck shift?
5. If you had to rebuild this project from scratch today, what technical decision would you change and why?

---

💬 **Now your turn!** Reply with your answers to questions 1 & 2, and I will evaluate your technical depth, clarity, and identify any red flags for real interviews.`,
        suggestedActions: [
          { label: 'View Project Specs', actionUrl: activeProj ? `/projects/${activeProj.slug}` : '/projects', type: 'PROJECT' },
          { label: 'Update Project Repo & Demo', actionUrl: '/dashboard', type: 'DASHBOARD' },
        ],
      };
    }

    // -------------------------------------------------------------
    // CAPABILITY 5: RESUME GUIDANCE & ATS OPTIMIZATION
    // -------------------------------------------------------------
    if (mode === 'ResumeReview' || promptLower.includes('resume') || promptLower.includes('cv') || promptLower.includes('bullet')) {
      return {
        reply: `### 📄 Resume Bullet Optimizer (Google XYZ Formula)

To get shortlisted at **${companies}**, every bullet point on your resume must follow the **Google XYZ Formula**:  
> *"Accomplished **[X]**, as measured by **[Y]**, by doing **[Z]**."*

---

#### ❌ Weak / Generic Bullets vs. ✅ High-Impact Placement Bullets:

* ❌ **Weak**: "Built a web app with React and Node.js with user authentication."
* ✅ **Strong**: "Architected a full-stack collaboration platform with React and Node.js, implementing JWT auth and RBAC to secure **500+ active sessions** with **sub-80ms API latency**."

* ❌ **Weak**: "Used Redis to speed up database queries."
* ✅ **Strong**: "Integrated Redis cache layer with LRU eviction and token bucket rate limiting, cutting database read throughput by **64%** and sustaining **5,000 req/sec** under load."

---

#### 📋 Top 4 Resume Checklist Rules:
1. **One Page Rule**: Keep formatting strict, 10-12pt font, clean margins.
2. **Live Links**: Every project must have clickable **GitHub Repository** and **Live Demo** links.
3. **Skills Taxonomy**: Group skills into Languages (C++, Java), Frameworks (React, Express), Databases (PostgreSQL, Redis), Tools (Docker, Git).
4. **Quantify Results**: Mention latency reductions, benchmark tests, queries optimized, or test coverage percentages.

*👉 You can build and export your formatted resume directly in our [Resume Builder](/resumes)!*`,
        suggestedActions: [
          { label: 'Open Resume Builder', actionUrl: '/resumes', type: 'RESUME' },
          { label: 'Read Resume Standard Guide', actionUrl: '/resume-guide', type: 'GUIDE' },
        ],
      };
    }

    // -------------------------------------------------------------
    // CAPABILITY 6: CUSTOMIZED LEARNING PLANS & ROADMAP
    // -------------------------------------------------------------
    if (mode === 'LearningPlan' || mode === 'Roadmap' || promptLower.includes('plan') || promptLower.includes('roadmap') || promptLower.includes('schedule')) {
      return {
        reply: `### 🗺️ Customized 6-Week Engineering Study Plan for Semester ${sem}

**Goal**: Elevate Placement Readiness for **${targetRole}** at **${companies}**.

---

* **Week 1: Advanced Data Structures & Memory Layout**
  * Focus: Balanced BSTs, Heaps, Trie, Segment Trees, and Cache-friendly array traversal.
  * Portal Textbook: *Introduction to Algorithms (CLRS)* — Chapters 6, 12, 13.
  * Practice: Solve 15 High-frequency DSA problems in [Interview Practice](/interviews).

* **Week 2: Database Systems & Transaction Isolation**
  * Focus: B+ Tree Indexing, ACID Isolation levels (Read Committed vs Serializable), Connection Pooling.
  * Portal Textbook: *Database System Concepts* by Silberschatz & Korth.

* **Week 3–4: High-Performance Portfolio Project Build**
  * Focus: Architect your active Tier-1 project (${activeProj ? activeProj.title : 'Distributed System'}).
  * Milestones: API contracts, Docker setup, Redis caching, stress testing with k6/wrk.

* **Week 5: Operating Systems & Networking Fundamentals**
  * Focus: Virtual Memory, Page Faults, Thread synchronization (Mutex vs Semaphore), TCP 3-Way Handshake, TCP vs UDP.
  * Portal Textbook: *Operating Systems: Three Easy Pieces (OSTEP)*.

* **Week 6: System Design & Mock Technical Grilling**
  * Focus: CDN, Load Balancers (L4 vs L7), Database Sharding, Consistent Hashing.
  * Action: Complete 5 mock interview drills with this AI Assistant.`,
        suggestedActions: [
          { label: 'Check Semester Roadmap', actionUrl: `/roadmap?sem=${sem}`, type: 'ROADMAP' },
          { label: 'Browse Standard Textbooks', actionUrl: '/books', type: 'BOOK' },
          { label: 'Start Mock Grilling', actionUrl: '/ai-assistant', type: 'AI' },
        ],
      };
    }

    // -------------------------------------------------------------
    // GENERAL MENTORING FALLBACK
    // -------------------------------------------------------------
    return {
      reply: `### 🤖 AI Career Mentor for ${name}

Welcome back! I am your personalized academic and placement mentor on the **CSE Career Portal**.

**Your Academic Profile Snapshot**:
* **Current Academic Stage**: Semester ${sem} (${context.branch})
* **Career Goal**: ${goal}
* **Target Companies**: ${companies}
* **Current Learning Streak**: 🔥 ${context.learningStreak} Days
* **Overall Placement Readiness**: ${context.readinessScores.overallPlacementScore}%

---

#### How I can help you right now:
1. **Skill Gap Breakdown**: Ask *"What skills am I missing for Google SDE-1?"*
2. **Project Suggestions**: Ask *"Recommend a Tier-1 project for my semester."*
3. **Mock Technical Grilling**: Ask *"Grill me on my project architecture!"*
4. **Interview Drill**: Ask *"Give me 3 tough DBMS and OS questions."*
5. **Resume Optimization**: Ask *"How can I improve my project bullet points?"*
6. **Study Roadmap**: Ask *"Give me a 6-week study schedule for Semester ${sem}."*

What would you like to focus on today?`,
      suggestedActions: [
        { label: 'Analyze My Skill Gap', actionUrl: '/ai-assistant?mode=SkillGap', type: 'AI' },
        { label: 'Explore Tier-1 Projects', actionUrl: '/projects', type: 'PROJECT' },
        { label: 'View Semester Roadmap', actionUrl: `/roadmap?sem=${sem}`, type: 'ROADMAP' },
      ],
    };
  }

  /**
   * 5. Main Process Message Method
   */
  static async sendMessage(userId, { prompt, mode = 'General', conversationId = null }) {
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      throw new AppError('Prompt is required.', HTTP_STATUS.BAD_REQUEST);
    }

    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.length > 2000) {
      throw new AppError('Prompt cannot exceed 2000 characters.', HTTP_STATUS.BAD_REQUEST);
    }

    // 1. Get or create conversation
    let conversation;
    if (conversationId) {
      conversation = await ChatConversation.findOne({ _id: conversationId, user: userId });
    }

    if (!conversation) {
      conversation = await ChatConversation.create({
        user: userId,
        title: trimmedPrompt.slice(0, 45) + (trimmedPrompt.length > 45 ? '...' : ''),
        mode: mode || 'General',
        messages: [],
      });
    }

    // 2. Fetch student context & portal knowledge
    const studentContext = await AiService.getStudentContext(userId);
    const portalKnowledge = await AiService.getPortalKnowledge(mode, studentContext);

    // 3. Append user message
    conversation.messages.push({
      role: 'user',
      content: trimmedPrompt,
      mode: mode || 'General',
      timestamp: new Date(),
    });

    // 4. Formulate System Prompt with strict grounding
    const systemPrompt = `You are VidyaPath AI, the official Academic and Career Assistant for Computer Science & Engineering students on the CSE Career Portal.
You are mentoring a student with the following profile:
- Name: ${studentContext.studentName}
- Current Semester: ${studentContext.semester} of 8
- Career Goal: ${studentContext.careerGoal}
- Target Role: ${studentContext.targetRole}
- Target Dream Companies: ${studentContext.targetCompanies.join(', ')}
- Technical Skills: ${studentContext.skills.join(', ') || 'C++, Python, React, SQL'}
- Active Project: ${studentContext.activeProjects[0]?.title || 'Distributed System'}
- Placement Readiness Score: ${studentContext.readinessScores.overallPlacementScore}%

PORTAL CONTENT RULES:
1. Ground your advice in real computer science fundamentals, international textbooks (CLRS, Tanenbaum, OSTEP, Silberschatz), and industry engineering practices.
2. Recommend real projects from the portal (e.g. Distributed Rate Limiter, Real-Time Code Editor, High-Throughput Message Queue).
3. Be encouraging, rigorous, highly technical, and concise with clean markdown formatting, bullet points, and code snippets where relevant.`;

    // 5. Try Gemini API first, otherwise use heuristic engine
    let assistantReply = await AiService.callGeminiApi(systemPrompt, trimmedPrompt);
    let suggestedActions = [];

    if (!assistantReply) {
      const fallbackResult = AiService.generateHeuristicResponse(mode, trimmedPrompt, studentContext, portalKnowledge);
      assistantReply = fallbackResult.reply;
      suggestedActions = fallbackResult.suggestedActions;
    } else {
      suggestedActions = [
        { label: 'Explore Project Hub', actionUrl: '/projects', type: 'PROJECT' },
        { label: 'Check Roadmap Progress', actionUrl: '/roadmap', type: 'ROADMAP' },
        { label: 'Practice Interview Questions', actionUrl: '/interviews', type: 'INTERVIEW' },
      ];
    }

    // 6. Append assistant message
    conversation.messages.push({
      role: 'assistant',
      content: assistantReply,
      mode: mode || 'General',
      portalContextUsed: true,
      suggestedActions,
      timestamp: new Date(),
    });

    conversation.lastMessageAt = new Date();
    conversation.pinnedContext = {
      semester: studentContext.semester,
      careerGoal: studentContext.careerGoal,
      targetRole: studentContext.targetRole,
      targetCompanies: studentContext.targetCompanies,
      activeProjectTitle: studentContext.activeProjects[0]?.title || '',
    };

    // Cap message history to latest 50 messages to prevent document bloat
    if (conversation.messages.length > 50) {
      conversation.messages = conversation.messages.slice(-50);
    }

    await conversation.save();

    return {
      conversationId: conversation._id,
      title: conversation.title,
      mode: conversation.mode,
      message: conversation.messages[conversation.messages.length - 1],
      studentContextSnapshot: conversation.pinnedContext,
    };
  }

  /**
   * 6. Retrieve all conversations for a user
   */
  static async getUserConversations(userId) {
    return await ChatConversation.find({ user: userId })
      .select('title mode lastMessageAt pinnedContext createdAt')
      .sort({ lastMessageAt: -1 })
      .limit(20);
  }

  /**
   * 7. Retrieve a single conversation with full message history
   */
  static async getConversationById(userId, conversationId) {
    const conv = await ChatConversation.findOne({ _id: conversationId, user: userId });
    if (!conv) {
      throw new AppError('Conversation not found.', HTTP_STATUS.NOT_FOUND);
    }
    return conv;
  }

  /**
   * 8. Delete a conversation thread
   */
  static async deleteConversation(userId, conversationId) {
    const deleted = await ChatConversation.findOneAndDelete({ _id: conversationId, user: userId });
    if (!deleted) {
      throw new AppError('Conversation not found.', HTTP_STATUS.NOT_FOUND);
    }
    return { message: 'Conversation deleted successfully.', id: conversationId };
  }

  /**
   * 9. 1-Click Quick Action Workflows
   */
  static async executeQuickAction(userId, actionType, payload = {}) {
    const validActions = [
      'skill-gap',
      'project-suggestion',
      'interview-drill',
      'project-grilling',
      'learning-plan',
      'resume-review',
    ];

    if (!validActions.includes(actionType)) {
      throw new AppError(`Invalid quick action. Supported: ${validActions.join(', ')}`, HTTP_STATUS.BAD_REQUEST);
    }

    const actionToModeMap = {
      'skill-gap': 'SkillGap',
      'project-suggestion': 'Projects',
      'interview-drill': 'InterviewPractice',
      'project-grilling': 'ProjectGrilling',
      'learning-plan': 'LearningPlan',
      'resume-review': 'ResumeReview',
    };

    const actionPrompts = {
      'skill-gap': 'Analyze my technical skill gaps for my target dream companies and provide a concrete closure roadmap.',
      'project-suggestion': 'Recommend the top 3 Tier-1 real-world projects from the portal that will make my resume stand out.',
      'interview-drill': 'Give me 3 high-frequency core CS and DSA interview questions with standard answer breakdowns.',
      'project-grilling': 'Act as a Senior Staff Engineer and grill me with tough technical questions about my active portfolio project.',
      'learning-plan': 'Create a customized 6-week study schedule tailored to my current semester curriculum and career target.',
      'resume-review': 'Review my project presentation and provide high-impact bullet points using the Google XYZ formula.',
    };

    const mode = actionToModeMap[actionType];
    const prompt = payload.prompt || actionPrompts[actionType];

    return await AiService.sendMessage(userId, {
      prompt,
      mode,
      conversationId: payload.conversationId,
    });
  }
}

module.exports = AiService;
