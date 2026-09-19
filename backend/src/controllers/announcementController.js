const AnnouncementService = require('../services/announcementService');
const ApiResponse = require('../utils/apiResponse');

const getAnnouncements = async (req, res, next) => {
  try {
    const { announcements, meta } = await AnnouncementService.getAnnouncements(req.query);
    return ApiResponse.success(res, 'Announcements fetched successfully.', announcements, 200, meta);
  } catch (err) {
    next(err);
  }
};

const getAnnouncementById = async (req, res, next) => {
  try {
    const announcement = await AnnouncementService.getAnnouncementById(req.params.id);
    return ApiResponse.success(res, 'Announcement details fetched successfully.', announcement);
  } catch (err) {
    next(err);
  }
};

const createAnnouncement = async (req, res, next) => {
  try {
    const announcement = await AnnouncementService.createAnnouncement(req.body);
    return ApiResponse.created(res, 'Announcement created successfully.', announcement);
  } catch (err) {
    next(err);
  }
};

const updateAnnouncement = async (req, res, next) => {
  try {
    const announcement = await AnnouncementService.updateAnnouncement(req.params.id, req.body);
    return ApiResponse.success(res, 'Announcement updated successfully.', announcement);
  } catch (err) {
    next(err);
  }
};

const deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await AnnouncementService.deleteAnnouncement(req.params.id);
    return ApiResponse.success(res, 'Announcement deleted successfully.', announcement);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
