const AdvisorService = require('../services/advisorService');
const ApiResponse = require('../utils/apiResponse');

const getCurriculumByYear = async (req, res, next) => {
  try {
    const { year } = req.params;
    const curriculum = await AdvisorService.getCurriculumByYear(year);
    return ApiResponse.success(res, `Curriculum knowledge for Year ${year} fetched successfully.`, curriculum);
  } catch (err) {
    next(err);
  }
};

const generateStudyPlan = async (req, res, next) => {
  try {
    const studyPlan = await AdvisorService.generateStudyPlan(req.body);
    return ApiResponse.success(res, 'Personalized AI study plan generated successfully.', studyPlan);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCurriculumByYear,
  generateStudyPlan,
};
