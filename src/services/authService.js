const crypto = require('crypto');
const { User, Profile, UserProgress } = require('../models');
const { generateToken } = require('../utils/jwt');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

class AuthService {
  static async registerUser(userData) {
    const { name, email, password, college, branch, semester, graduationYear, specialization } = userData;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      throw new AppError('An account with this email address already exists.', HTTP_STATUS.CONFLICT);
    }

    // 2. Create User (Enforce student role for public registration)
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'student', // Never trust role from registration payload
      isActive: true,
    });

    // 3. Create Default Profile
    const profile = await Profile.create({
      user: user._id,
      college: college ? college.trim() : '',
      branch: branch ? branch.trim() : 'Computer Science and Engineering',
      semester: semester ? Number(semester) : 1,
      graduationYear: graduationYear ? Number(graduationYear) : new Date().getFullYear() + 4,
      specialization: specialization || 'General CSE',
    });

    // 4. Create Initial UserProgress
    await UserProgress.create({
      user: user._id,
      currentStreak: 0,
      longestStreak: 0,
      readinessScores: {
        dsaScore: 0,
        coreCsScore: 0,
        projectsScore: 0,
        overallPlacementScore: 0,
      },
    });

    // 5. Generate Token
    const token = generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: {
          college: profile.college,
          branch: profile.branch,
          semester: profile.semester,
          specialization: profile.specialization,
        },
      },
      token,
    };
  }

  static async loginUser(credentials) {
    const { email, password } = credentials;

    // 1. Find user & select password explicitly
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user || !(await user.comparePassword(password, user.password))) {
      throw new AppError('Invalid email or password.', HTTP_STATUS.UNAUTHORIZED);
    }

    // 2. Check if account is active
    if (!user.isActive) {
      throw new AppError('Your account has been deactivated. Please contact an administrator.', HTTP_STATUS.FORBIDDEN);
    }

    // 3. Populate profile data
    const profile = await Profile.findOne({ user: user._id });

    // 4. Generate Token
    const token = generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: profile || null,
      },
      token,
    };
  }

  static async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);
    }

    const profile = await Profile.findOne({ user: userId }).populate('skills');
    const progress = await UserProgress.findOne({ user: userId });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
      profile: profile || null,
      progress: progress || null,
    };
  }

  static async forgotPassword(email) {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Return success message to prevent user enumeration
      return { message: 'If an account with that email exists, a password reset token has been generated.' };
    }

    // Generate random 32-byte reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and save to user document with 10-minute expiry
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    return {
      message: 'Password reset token generated successfully.',
      resetToken, // Returned for testing / client consumption
      expiresInMinutes: 10,
    };
  }

  static async resetPassword(token, newPassword) {
    // 1. Hash incoming token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // 2. Find user with matching token and unexpired window
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError('Password reset token is invalid or has expired.', HTTP_STATUS.BAD_REQUEST);
    }

    // 3. Set new password & clear reset fields
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now();

    await user.save();

    // 4. Log the user in with new token
    const jwtToken = generateToken(user._id, user.role);

    return {
      message: 'Password has been reset successfully.',
      token: jwtToken,
    };
  }

  static async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new AppError('User not found.', HTTP_STATUS.NOT_FOUND);
    }

    if (!(await user.comparePassword(currentPassword, user.password))) {
      throw new AppError('Your current password is incorrect.', HTTP_STATUS.UNAUTHORIZED);
    }

    user.password = newPassword;
    user.passwordChangedAt = Date.now();
    await user.save();

    const token = generateToken(user._id, user.role);

    return {
      message: 'Password changed successfully.',
      token,
    };
  }
}

module.exports = AuthService;
