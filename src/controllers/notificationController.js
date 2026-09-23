const NotificationService = require('../services/notificationService');
const ApiResponse = require('../utils/apiResponse');

const getUserNotifications = async (req, res, next) => {
  try {
    // Seed initial notifications if first time
    await NotificationService.seedInitialNotificationsIfEmpty(req.user._id, req.user.name);
    const { notifications, unreadCount } = await NotificationService.getUserNotifications(req.user._id, req.query);
    return ApiResponse.success(res, 'Notifications fetched successfully.', {
      notifications,
      unreadCount,
    });
  } catch (err) {
    next(err);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const result = await NotificationService.markAsRead(req.user._id, req.params.id);
    return ApiResponse.success(res, 'Notification marked as read.', result);
  } catch (err) {
    next(err);
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    const result = await NotificationService.markAllAsRead(req.user._id);
    return ApiResponse.success(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const result = await NotificationService.deleteNotification(req.user._id, req.params.id);
    return ApiResponse.success(res, 'Notification removed successfully.', result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
