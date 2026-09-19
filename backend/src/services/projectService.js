const { Project, Skill, ProjectProgress, UserProgress } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');
const { getPagination, getPaginationMeta } = require('../utils/pagination');
const mongoose = require('mongoose');

class ProjectService {
  static async getProjects(query) {
    const { page, limit, skip } = getPagination(query, 12);
    const filter = { status: 'Published' };

    // 1. Search Query
    if (query.search && query.search.trim()) {
      filter.$text = { $search: query.search.trim() };
    }

    // 2. Category Filter
    if (query.category) {
      filter.category = query.category;
    }

    // 3. Difficulty Filter
    if (query.difficulty) {
      filter.difficulty = query.difficulty.toUpperCase();
    }

    // 4. Technology Filter
    if (query.technology) {
      filter.$or = [
        { 'technologyStack.frontend': query.technology },
        { 'technologyStack.backend': query.technology },
        { 'technologyStack.database': query.technology },
        { 'technologyStack.devops': query.technology },
      ];
    }

    // 5. Skills Filter
    if (query.skills) {
      const skillNames = Array.isArray(query.skills) ? query.skills : [query.skills];
      const matchedSkills = await Skill.find({ name: { $in: skillNames } }).select('_id');
      const skillIds = matchedSkills.map((s) => s._id);
      if (skillIds.length > 0) {
        filter.skills = { $in: skillIds };
      }
    }

    // 6. Sorting
    let sort = { createdAt: -1 };
    if (query.sort === 'difficulty-asc') {
      sort = { difficulty: 1 };
    } else if (query.sort === 'difficulty-desc') {
      sort = { difficulty: -1 };
    } else if (query.sort === 'title') {
      sort = { title: 1 };
    }

    const [projects, totalItems] = await Promise.all([
      Project.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('skills', 'name category level')
        .select('title slug category difficulty description technologyStack mvp skills createdAt'),
      Project.countDocuments(filter),
    ]);

    const meta = getPaginationMeta(totalItems, page, limit);

    return { projects, meta };
  }

  static async getProjectBySlugOrId(slugOrId) {
    const isObjectId = mongoose.Types.ObjectId.isValid(slugOrId);
    const query = isObjectId ? { _id: slugOrId } : { slug: slugOrId.toLowerCase() };

    const project = await Project.findOne(query).populate('skills');
    if (!project) {
      throw new AppError('Project not found.', HTTP_STATUS.NOT_FOUND);
    }

    return project;
  }

  static async createProject(data, adminUserId) {
    // Generate unique slug
    let slug = (data.slug || data.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const existing = await Project.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const project = await Project.create({
      ...data,
      slug,
      createdBy: adminUserId,
      updatedBy: adminUserId,
    });

    return project;
  }

  static async updateProject(id, data, adminUserId) {
    const project = await Project.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedBy: adminUserId,
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      throw new AppError('Project not found.', HTTP_STATUS.NOT_FOUND);
    }

    return project;
  }

  static async deleteProject(id) {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      throw new AppError('Project not found.', HTTP_STATUS.NOT_FOUND);
    }
    return project;
  }

  // --- Student Project Progress Tracking ---
  static async getUserProjectProgress(userId) {
    const items = await ProjectProgress.find({ user: userId })
      .populate('project', 'title slug difficulty category description technologyStack')
      .sort({ updatedAt: -1 });

    return items;
  }

  static async getProjectProgressById(userId, projectIdOrSlug) {
    let projectId = projectIdOrSlug;
    if (!mongoose.Types.ObjectId.isValid(projectIdOrSlug)) {
      const proj = await Project.findOne({ slug: projectIdOrSlug.toLowerCase() });
      if (proj) projectId = proj._id;
    }

    const progress = await ProjectProgress.findOne({ user: userId, project: projectId })
      .populate('project', 'title slug difficulty category description technologyStack');

    return progress;
  }

  static async createOrUpdateProjectProgress(userId, projectIdOrSlug, data) {
    let projectId = projectIdOrSlug || (data && data.projectId);
    if (!projectId) {
      throw new AppError('Project ID or slug is required.', HTTP_STATUS.BAD_REQUEST);
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      const proj = await Project.findOne({ slug: projectId.toString().toLowerCase() });
      if (!proj) {
        throw new AppError('Project not found.', HTTP_STATUS.NOT_FOUND);
      }
      projectId = proj._id;
    }

    const { status, customRepoUrl, liveDemoUrl, completedMilestones, studentNotes } = data;

    let normalizedMilestones = undefined;
    if (Array.isArray(completedMilestones)) {
      normalizedMilestones = completedMilestones.map((m) =>
        typeof m === 'string' ? { title: m, completedAt: new Date() } : m
      );
    }

    const progress = await ProjectProgress.findOneAndUpdate(
      { user: userId, project: projectId },
      {
        $set: {
          ...(status ? { status } : {}),
          ...(customRepoUrl !== undefined ? { customRepoUrl } : {}),
          ...(liveDemoUrl !== undefined ? { liveDemoUrl } : {}),
          ...(normalizedMilestones !== undefined ? { completedMilestones: normalizedMilestones } : {}),
          ...(studentNotes !== undefined ? { studentNotes } : {}),
        },
      },
      { new: true, upsert: true, runValidators: true }
    ).populate('project', 'title slug difficulty category');

    // Update student readiness score & activity streak
    try {
      let userProg = await UserProgress.findOne({ user: userId });
      if (!userProg) {
        userProg = await UserProgress.create({ user: userId });
      }

      // Count completed/building projects
      const allStudentProjects = await ProjectProgress.find({ user: userId });
      const completed = allStudentProjects.filter((p) => ['Deployed', 'Completed'].includes(p.status)).length;
      const building = allStudentProjects.filter((p) => ['Building', 'Testing'].includes(p.status)).length;

      userProg.readinessScores.projectsScore = Math.min(100, (completed * 40) + (building * 15));
      userProg.readinessScores.overallPlacementScore = Math.round(
        (userProg.readinessScores.dsaScore +
          userProg.readinessScores.coreCsScore +
          userProg.readinessScores.projectsScore) / 3
      );

      if (userProg.recordActivity) {
        await userProg.recordActivity();
      } else {
        await userProg.save();
      }
    } catch (err) {
      console.warn('Could not update student streak on project progress:', err);
    }

    return progress;
  }

  static async deleteProjectProgress(userId, projectIdOrSlug) {
    let projectId = projectIdOrSlug;
    if (!mongoose.Types.ObjectId.isValid(projectIdOrSlug)) {
      const proj = await Project.findOne({ slug: projectIdOrSlug.toLowerCase() });
      if (proj) projectId = proj._id;
    }

    const deleted = await ProjectProgress.findOneAndDelete({ user: userId, project: projectId });
    if (!deleted) {
      throw new AppError('Project progress tracking record not found.', HTTP_STATUS.NOT_FOUND);
    }
    return deleted;
  }
}

module.exports = ProjectService;
