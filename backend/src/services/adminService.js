const {
  User,
  Profile,
  Skill,
  Roadmap,
  Project,
  InterviewQuestion,
  Book,
  Course,
  YouTubeResource,
  Resource,
  Hackathon,
  Announcement,
  AuditLog,
  UserProgress,
} = require('../models');
const AuditService = require('./auditService');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const { escapeRegex } = require('../utils/sanitize');

class AdminService {
  /**
   * Aggregate high-level platform statistics for the Admin Dashboard
   */
  static async getDashboardStats() {
    const [
      totalUsers,
      totalStudents,
      totalAdmins,
      activeUsers,
      totalProjects,
      totalRoadmaps,
      totalInterviews,
      totalBooks,
      totalCourses,
      totalYouTube,
      totalResources,
      totalHackathons,
      totalAnnouncements,
      totalSkills,
      recentAuditLogs,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ isActive: true }),
      Project.countDocuments(),
      Roadmap.countDocuments(),
      InterviewQuestion.countDocuments(),
      Book.countDocuments(),
      Course.countDocuments(),
      YouTubeResource.countDocuments(),
      Resource.countDocuments(),
      Hackathon.countDocuments(),
      Announcement.countDocuments(),
      Skill.countDocuments(),
      AuditLog.find().sort({ createdAt: -1 }).limit(8).lean(),
      User.find().sort({ createdAt: -1 }).limit(5).select('-password').lean(),
    ]);

    return {
      overview: {
        totalUsers,
        totalStudents,
        totalAdmins,
        activeUsers,
      },
      contentCatalog: {
        projects: totalProjects,
        roadmaps: totalRoadmaps,
        interviews: totalInterviews,
        books: totalBooks,
        courses: totalCourses,
        youtube: totalYouTube,
        resources: totalResources,
        hackathons: totalHackathons,
        announcements: totalAnnouncements,
        skills: totalSkills,
      },
      recentAuditLogs,
      recentUsers,
    };
  }

  // ==========================================
  // USER MANAGEMENT
  // ==========================================

  static async getUsers({ page = 1, limit = 20, role, status, search, sortBy = 'createdAt', order = 'desc' }) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (role && role !== 'ALL') filter.role = role;
    if (status !== undefined && status !== 'ALL') {
      filter.isActive = status === 'active' || status === true || status === 'true';
    }

    if (search && search.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), 'i');
      filter.$or = [{ name: regex }, { email: regex }];
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    const [users, total] = await Promise.all([
      User.find(filter).sort(sort).skip(skip).limit(limitNum).select('-password').lean(),
      User.countDocuments(filter),
    ]);

    // Attach profile summary if student
    const userIds = users.map((u) => u._id);
    const profiles = await Profile.find({ user: { $in: userIds } }).lean();
    const profileMap = {};
    profiles.forEach((p) => {
      profileMap[String(p.user)] = p;
    });

    const enrichedUsers = users.map((u) => ({
      ...u,
      profile: profileMap[String(u._id)] || null,
    }));

    return {
      users: enrichedUsers,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    };
  }

  static async getUserById(id) {
    const user = await User.findById(id).select('-password').lean();
    if (!user) throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);

    const [profile, progress] = await Promise.all([
      Profile.findOne({ user: id }).lean(),
      UserProgress.findOne({ user: id }).lean(),
    ]);

    return { ...user, profile, progress };
  }

  static async createUser(userData, req) {
    const existing = await User.findOne({ email: userData.email.toLowerCase().trim() });
    if (existing) {
      throw new AppError('User with this email already exists.', HTTP_STATUS.CONFLICT);
    }

    const newUser = await User.create({
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      password: userData.password,
      role: userData.role || 'student',
      isActive: userData.isActive !== undefined ? userData.isActive : true,
    });

    // Create empty profile
    await Profile.create({
      user: newUser._id,
      bio: userData.bio || '',
      department: 'Computer Science and Engineering',
      semester: userData.semester || 1,
    });

    await AuditService.logAction(req, {
      action: 'CREATE',
      resourceType: 'User',
      resourceId: newUser._id,
      resourceTitle: newUser.name,
      details: { email: newUser.email, role: newUser.role },
    });

    const userObj = newUser.toObject();
    delete userObj.password;
    return userObj;
  }

  static async updateUser(id, updateData, req) {
    const user = await User.findById(id);
    if (!user) throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);

    if (updateData.email && updateData.email.toLowerCase() !== user.email) {
      const existing = await User.findOne({ email: updateData.email.toLowerCase().trim() });
      if (existing && String(existing._id) !== String(id)) {
        throw new AppError('Email address already in use by another account.', HTTP_STATUS.CONFLICT);
      }
      user.email = updateData.email.toLowerCase().trim();
    }

    if (updateData.name) user.name = updateData.name.trim();
    if (updateData.role) user.role = updateData.role;
    if (updateData.isActive !== undefined) user.isActive = updateData.isActive;
    if (updateData.password) user.password = updateData.password;

    await user.save();

    await AuditService.logAction(req, {
      action: 'UPDATE',
      resourceType: 'User',
      resourceId: user._id,
      resourceTitle: user.name,
      details: { role: user.role, isActive: user.isActive },
    });

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }

  static async toggleUserStatus(id, req) {
    const user = await User.findById(id);
    if (!user) throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);

    user.isActive = !user.isActive;
    await user.save();

    await AuditService.logAction(req, {
      action: 'TOGGLE_STATUS',
      resourceType: 'User',
      resourceId: user._id,
      resourceTitle: user.name,
      details: { newStatus: user.isActive ? 'Active' : 'Inactive' },
    });

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }

  static async deleteUser(id, req) {
    const user = await User.findById(id);
    if (!user) throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);

    // Safeguard: Prevent deleting oneself
    if (String(req.user?._id) === String(id)) {
      throw new AppError('Cannot delete your own administrator account.', HTTP_STATUS.BAD_REQUEST);
    }

    await Promise.all([
      User.findByIdAndDelete(id),
      Profile.deleteMany({ user: id }),
      UserProgress.deleteMany({ user: id }),
    ]);

    await AuditService.logAction(req, {
      action: 'DELETE',
      resourceType: 'User',
      resourceId: id,
      resourceTitle: user.name,
      details: { email: user.email, role: user.role },
    });

    return { success: true, message: 'User deleted successfully.' };
  }

  // ==========================================
  // SKILL MANAGEMENT
  // ==========================================

  static async getSkills({ page = 1, limit = 50, category, search }) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (category && category !== 'ALL') filter.category = category;
    if (search && search.trim()) {
      filter.name = new RegExp(escapeRegex(search.trim()), 'i');
    }

    const [skills, total] = await Promise.all([
      Skill.find(filter).sort({ category: 1, name: 1 }).skip(skip).limit(limitNum).lean(),
      Skill.countDocuments(filter),
    ]);

    return {
      skills,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    };
  }

  static async createSkill(skillData, req) {
    const existing = await Skill.findOne({ name: skillData.name.trim() });
    if (existing) {
      throw new AppError('A skill with this name already exists.', HTTP_STATUS.CONFLICT);
    }

    const skill = await Skill.create({
      name: skillData.name.trim(),
      category: skillData.category,
      description: skillData.description || '',
      icon: skillData.icon || 'Code',
      proficiencyLevels: skillData.proficiencyLevels || ['Beginner', 'Intermediate', 'Advanced'],
      isPublished: skillData.isPublished !== undefined ? skillData.isPublished : true,
    });

    await AuditService.logAction(req, {
      action: 'CREATE',
      resourceType: 'Skill',
      resourceId: skill._id,
      resourceTitle: skill.name,
      details: { category: skill.category },
    });

    return skill;
  }

  static async updateSkill(id, skillData, req) {
    const skill = await Skill.findByIdAndUpdate(
      id,
      {
        ...skillData,
        name: skillData.name ? skillData.name.trim() : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!skill) throw new AppError('Skill not found.', HTTP_STATUS.NOT_FOUND);

    await AuditService.logAction(req, {
      action: 'UPDATE',
      resourceType: 'Skill',
      resourceId: skill._id,
      resourceTitle: skill.name,
      details: { category: skill.category },
    });

    return skill;
  }

  static async deleteSkill(id, req) {
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) throw new AppError('Skill not found.', HTTP_STATUS.NOT_FOUND);

    await AuditService.logAction(req, {
      action: 'DELETE',
      resourceType: 'Skill',
      resourceId: id,
      resourceTitle: skill.name,
      details: { category: skill.category },
    });

    return { success: true, message: 'Skill deleted successfully.' };
  }

  // ==========================================
  // UNIVERSAL PUBLISH / UNPUBLISH TOGGLE
  // ==========================================

  static async togglePublish(resourceType, id, req) {
    const modelMap = {
      Project: Project,
      Roadmap: Roadmap,
      InterviewQuestion: InterviewQuestion,
      Book: Book,
      Course: Course,
      YouTubeResource: YouTubeResource,
      Resource: Resource,
      Hackathon: Hackathon,
      Announcement: Announcement,
      Skill: Skill,
      User: User,
    };

    const Model = modelMap[resourceType];
    if (!Model) {
      throw new AppError(`Unsupported resource type: ${resourceType}`, HTTP_STATUS.BAD_REQUEST);
    }

    const doc = await Model.findById(id);
    if (!doc) {
      throw new AppError(`${resourceType} not found with ID ${id}`, HTTP_STATUS.NOT_FOUND);
    }

    let isNowPublished = true;
    let title = doc.title || doc.name || doc.question || resourceType;

    if (resourceType === 'Project') {
      doc.status = doc.status === 'Published' ? 'Draft' : 'Published';
      isNowPublished = doc.status === 'Published';
    } else if (resourceType === 'Hackathon') {
      doc.status = doc.status === 'Draft' ? 'Upcoming' : 'Draft';
      isNowPublished = doc.status !== 'Draft';
    } else if (resourceType === 'Roadmap') {
      doc.isActive = !doc.isActive;
      isNowPublished = doc.isActive;
    } else if (resourceType === 'Announcement') {
      doc.isBroadcast = !doc.isBroadcast;
      isNowPublished = doc.isBroadcast;
    } else if (resourceType === 'User') {
      doc.isActive = !doc.isActive;
      isNowPublished = doc.isActive;
    } else {
      doc.isPublished = doc.isPublished !== undefined ? !doc.isPublished : false;
      isNowPublished = doc.isPublished;
    }

    await doc.save();

    await AuditService.logAction(req, {
      action: isNowPublished ? 'PUBLISH' : 'UNPUBLISH',
      resourceType,
      resourceId: doc._id,
      resourceTitle: title,
      details: { isPublished: isNowPublished },
    });

    return {
      resourceType,
      id: doc._id,
      isPublished: isNowPublished,
      doc,
    };
  }
}

module.exports = AdminService;
