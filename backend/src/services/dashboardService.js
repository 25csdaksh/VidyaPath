const {
  Profile,
  RoadmapProgress,
  ProjectProgress,
  UserProgress,
  Bookmark,
  Roadmap,
  Project,
  InterviewQuestion,
  Notification,
} = require('../models');

class DashboardService {
  static async getStudentDashboard(userId) {
    const [
      profile,
      roadmapProgressList,
      projectProgressList,
      userProgress,
      bookmarksCount,
      recentBookmarks,
      unreadNotificationsCount,
    ] = await Promise.all([
      Profile.findOne({ user: userId }).populate('skills', 'name category level'),
      RoadmapProgress.find({ user: userId }).populate('roadmap', 'title year semester slug'),
      ProjectProgress.find({ user: userId }).populate('project', 'title slug difficulty category description'),
      UserProgress.findOne({ user: userId }),
      Bookmark.countDocuments({ user: userId }),
      Bookmark.find({ user: userId }).sort({ createdAt: -1 }).limit(6).populate('resourceId'),
      Notification.countDocuments({ user: userId, isRead: false }),
    ]);

    // 1. Calculate Profile Completion Percentage
    let profileScore = 20; // Default account created
    if (profile) {
      if (profile.college && profile.college.trim()) profileScore += 10;
      if (profile.bio && profile.bio.trim()) profileScore += 10;
      if (profile.github && profile.github.trim()) profileScore += 10;
      if (profile.linkedin && profile.linkedin.trim()) profileScore += 10;
      if (profile.careerGoal && profile.careerGoal.trim()) profileScore += 20;
      if (profile.skills && profile.skills.length > 0) profileScore += 20;
    }
    const profileCompletion = Math.min(100, profileScore);

    // 2. Roadmap Progress Summary
    let totalRoadmapPercentage = 0;
    if (roadmapProgressList.length > 0) {
      const sum = roadmapProgressList.reduce((acc, curr) => acc + (curr.progressPercentage || 0), 0);
      totalRoadmapPercentage = Math.round(sum / roadmapProgressList.length);
    }

    // 3. Project Progress Summary
    const inProgressProjects = projectProgressList.filter((p) =>
      ['Planning', 'Building', 'Testing', 'Idea'].includes(p.status)
    );
    const completedProjects = projectProgressList.filter((p) =>
      ['Deployed', 'Completed'].includes(p.status)
    );

    // 4. Interview Readiness & Progress
    const totalPracticedQuestions = userProgress ? userProgress.interviewPracticedQuestions.length : 0;
    const readinessScores = userProgress
      ? userProgress.readinessScores
      : { dsaScore: 0, coreCsScore: 0, projectsScore: 0, overallPlacementScore: 0 };

    // 5. Dynamic Tailored Recommendations
    const recommendations = [];

    if (!profile?.careerGoal || !profile.careerGoal.trim()) {
      recommendations.push({
        type: 'GOAL',
        title: 'Define your Target Career Goal',
        actionUrl: '/profile',
        description: 'Set your dream job role and target companies to personalize your roadmap priorities.',
        priority: 'High',
      });
    }

    if (totalRoadmapPercentage < 35) {
      const currentSem = profile ? profile.semester : 1;
      recommendations.push({
        type: 'ROADMAP',
        title: `Explore Semester ${currentSem} Milestone Checklist`,
        actionUrl: `/roadmap`,
        description: 'Track your weekly milestone checkpoints for your current academic semester.',
        priority: 'High',
      });
    }

    if (projectProgressList.length === 0) {
      recommendations.push({
        type: 'PROJECT',
        title: 'Start a Tier-1 Real-World Project',
        actionUrl: '/projects',
        description: 'Select an industry-grade system design project with database schemas and API contracts.',
        priority: 'Medium',
      });
    } else if (inProgressProjects.length > 0) {
      const activeProj = inProgressProjects[0];
      recommendations.push({
        type: 'PROJECT_UPDATE',
        title: `Continue Building: ${activeProj.project?.title || 'Project'}`,
        actionUrl: `/projects/${activeProj.project?.slug || ''}`,
        description: `Current Stage: ${activeProj.status}. Push your next milestone and link your GitHub repository.`,
        priority: 'High',
      });
    }

    if (totalPracticedQuestions < 15) {
      recommendations.push({
        type: 'INTERVIEW',
        title: 'Practice High-Frequency Core CS Questions',
        actionUrl: '/interviews',
        description: 'Solidify your fundamentals in DBMS, Operating Systems, Computer Networks, and DSA.',
        priority: 'Medium',
      });
    }

    // 6. Recently Viewed Resources
    const recentlyViewed = userProgress?.recentlyViewed
      ? [...userProgress.recentlyViewed].sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt)).slice(0, 10)
      : [];

    return {
      profileCompletion: {
        percentage: profileCompletion,
        isComplete: profileCompletion >= 80,
      },
      profile: {
        college: profile?.college || '',
        semester: profile?.semester || 1,
        specialization: profile?.specialization || 'General CSE',
        careerGoal: profile?.careerGoal || '',
        targetRole: profile?.targetRole || '',
        targetCompanies: profile?.targetCompanies || [],
        completionPercentage: profileCompletion,
      },
      roadmapProgress: {
        overallPercentage: totalRoadmapPercentage,
        activeRoadmaps: roadmapProgressList,
      },
      projectProgress: {
        totalTracked: projectProgressList.length,
        inProgressCount: inProgressProjects.length,
        completedCount: completedProjects.length,
        items: projectProgressList,
      },
      interviewProgress: {
        totalPracticed: totalPracticedQuestions,
        readinessScores,
      },
      bookmarks: {
        totalCount: bookmarksCount,
        recent: recentBookmarks,
      },
      activitySummary: {
        currentStreak: userProgress ? userProgress.currentStreak : 0,
        longestStreak: userProgress ? userProgress.longestStreak : 0,
        lastActiveDate: userProgress ? userProgress.lastActiveDate : new Date(),
        activityHeatmap: userProgress ? userProgress.activityHeatmap : [],
      },
      notifications: {
        unreadCount: unreadNotificationsCount,
      },
      recentlyViewed,
      recommendedNextActions: recommendations,
    };
  }

  static async recordRecentView(userId, itemData) {
    const { resourceType, resourceId, title, category, url } = itemData;
    if (!resourceType || !resourceId) return null;

    let userProgress = await UserProgress.findOne({ user: userId });
    if (!userProgress) {
      userProgress = await UserProgress.create({ user: userId });
    }

    // Remove existing entry for same resource if present
    userProgress.recentlyViewed = userProgress.recentlyViewed.filter(
      (r) => r.resourceId.toString() !== resourceId.toString()
    );

    // Prepend new view
    userProgress.recentlyViewed.unshift({
      resourceType,
      resourceId,
      title: title || '',
      category: category || '',
      url: url || '',
      viewedAt: new Date(),
    });

    // Keep only last 25 views
    if (userProgress.recentlyViewed.length > 25) {
      userProgress.recentlyViewed = userProgress.recentlyViewed.slice(0, 25);
    }

    // Record activity for streak
    if (userProgress.recordActivity) {
      await userProgress.recordActivity();
    } else {
      await userProgress.save();
    }

    return userProgress.recentlyViewed;
  }

  static async getRecentViews(userId) {
    const userProgress = await UserProgress.findOne({ user: userId });
    if (!userProgress || !userProgress.recentlyViewed) {
      return [];
    }
    return userProgress.recentlyViewed;
  }
}

module.exports = DashboardService;
