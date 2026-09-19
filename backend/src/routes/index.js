const express = require('express');

const healthRoutes = require('./healthRoutes');
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const roadmapRoutes = require('./roadmapRoutes');
const projectRoutes = require('./projectRoutes');
const interviewRoutes = require('./interviewRoutes');
const bookRoutes = require('./bookRoutes');
const courseRoutes = require('./courseRoutes');
const youtubeRoutes = require('./youtubeRoutes');
const resourceRoutes = require('./resourceRoutes');
const hackathonRoutes = require('./hackathonRoutes');
const announcementRoutes = require('./announcementRoutes');
const bookmarkRoutes = require('./bookmarkRoutes');
const bookmarkCollectionRoutes = require('./bookmarkCollectionRoutes');
const resumeRoutes = require('./resumeRoutes');
const searchRoutes = require('./searchRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const notificationRoutes = require('./notificationRoutes');
const aiRoutes = require('./aiRoutes');
const adminRoutes = require('./adminRoutes');

const router = express.Router();

// Mount API Endpoints
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/roadmap', roadmapRoutes);
router.use('/projects', projectRoutes);
router.use('/interviews', interviewRoutes);
router.use('/books', bookRoutes);
router.use('/courses', courseRoutes);
router.use('/youtube', youtubeRoutes);
router.use('/resources', resourceRoutes);
router.use('/hackathons', hackathonRoutes);
router.use('/announcements', announcementRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/bookmark-collections', bookmarkCollectionRoutes);
router.use('/resumes', resumeRoutes);
router.use('/search', searchRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/notifications', notificationRoutes);
router.use('/ai', aiRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
