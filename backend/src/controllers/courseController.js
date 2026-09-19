const CourseService = require('../services/courseService');
const ApiResponse = require('../utils/apiResponse');

const getCourses = async (req, res, next) => {
  try {
    const { courses, meta } = await CourseService.getCourses(req.query);
    return ApiResponse.success(res, 'Courses fetched successfully.', courses, 200, meta);
  } catch (err) {
    next(err);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await CourseService.getCourseById(req.params.id);
    return ApiResponse.success(res, 'Course details fetched successfully.', course);
  } catch (err) {
    next(err);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const course = await CourseService.createCourse(req.body, req);
    return ApiResponse.success(res, 'Course created successfully.', course, 201);
  } catch (err) {
    next(err);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await CourseService.updateCourse(req.params.id, req.body, req);
    return ApiResponse.success(res, 'Course updated successfully.', course);
  } catch (err) {
    next(err);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const result = await CourseService.deleteCourse(req.params.id, req);
    return ApiResponse.success(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
