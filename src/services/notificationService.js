const { Notification } = require('../models');
const AppError = require('../utils/appError');
const { HTTP_STATUS } = require('../constants/httpStatusCodes');

class NotificationService {
  static async getUserNotifications(userId, query = {}) {
    const filter = { user: userId };
    if (query.unreadOnly === 'true' || query.unreadOnly === true) {
      filter.isRead = false;
    }
    if (query.category) {
      filter.category = query.category;
    }

    const [notifications, unreadCount] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).limit(parseInt(query.limit || '30', 10)),
      Notification.countDocuments({ user: userId, isRead: false }),
    ]);

    return { notifications, unreadCount };
  }

  static async markAsRead(userId, notificationId) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!notification) {
      throw new AppError('Notification not found.', HTTP_STATUS.NOT_FOUND);
    }

    const unreadCount = await Notification.countDocuments({ user: userId, isRead: false });
    return { notification, unreadCount };
  }

  static async markAllAsRead(userId) {
    await Notification.updateMany({ user: userId, isRead: false }, { $set: { isRead: true } });
    return { message: 'All notifications marked as read.', unreadCount: 0 };
  }

  static async deleteNotification(userId, notificationId) {
    const notification = await Notification.findOneAndDelete({ _id: notificationId, user: userId });
    if (!notification) {
      throw new AppError('Notification not found.', HTTP_STATUS.NOT_FOUND);
    }
    const unreadCount = await Notification.countDocuments({ user: userId, isRead: false });
    return { notification, unreadCount };
  }

  static async createNotification(data) {
    return await Notification.create(data);
  }

  static async seedInitialNotificationsIfEmpty(userId, userName = 'Student') {
    const count = await Notification.countDocuments({ user: userId });
    if (count === 0) {
      await Notification.insertMany([
        {
          user: userId,
          title: 'Welcome to VidyaPath!',
          message: `Welcome ${userName}! Start tracking your 4-year CSE curriculum, build tier-1 projects, and prepare for placement season.`,
          category: 'System',
          isRead: false,
          actionUrl: '/dashboard',
        },
        {
          user: userId,
          title: 'Semester Curriculum Available',
          message: 'Explore your semester subjects, core milestones, and interview checkpoints in the Roadmap tab.',
          category: 'Roadmap',
          isRead: false,
          actionUrl: '/roadmap',
        },
        {
          user: userId,
          title: 'Smart India Hackathon Registrations Open',
          message: 'Explore problem themes, form a team, and register before the upcoming deadline.',
          category: 'Hackathon',
          isRead: false,
          actionUrl: '/hackathons',
        },
      ]);
    }
  }
}

module.exports = NotificationService;
