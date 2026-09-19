const { Profile, User } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

class ProfileService {
  /**
   * Retrieve a user's full profile including populated skills and basic user details
   */
  static async getProfileByUserId(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);
    }

    let profile = await Profile.findOne({ user: userId }).populate('skills');

    if (!profile) {
      // Auto-create blank profile if not existing
      profile = await Profile.create({ user: userId });
    }

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      profile,
    };
  }

  /**
   * Update profile fields and optional user basic info (like name)
   */
  static async updateProfileByUserId(userId, updateData) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);
    }

    // Optional user-level update
    if (updateData.name && typeof updateData.name === 'string') {
      user.name = updateData.name.trim();
      await user.save();
    }

    // Whitelisted profile fields to prevent arbitrary field injection
    const allowedFields = [
      'profilePhoto',
      'college',
      'degree',
      'branch',
      'semester',
      'graduationYear',
      'bio',
      'location',
      'linkedin',
      'github',
      'portfolio',
      'leetcode',
      'codeforces',
      'careerGoal',
      'targetRole',
      'targetCompanies',
      'specialization',
      'skills',
    ];

    const profileUpdates = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        profileUpdates[key] = updateData[key];
      }
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: profileUpdates },
      { new: true, runValidators: true, upsert: true }
    ).populate('skills');

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      profile: updatedProfile,
    };
  }
}

module.exports = ProfileService;
