import api from './api';
import { API_ROUTES } from '../constants/apiRoutes';

export const advisorService = {
  /**
   * Fetch complete curriculum knowledge guide by year (1 to 4)
   * @param {number|string} year
   */
  async getCurriculumByYear(year) {
    return await api.get(API_ROUTES.ADVISOR.CURRICULUM(year));
  },

  /**
   * Generate a tailored 4-week study plan
   * @param {object} payload - { year, semester, targetRole, skillLevel, weeklyHours, focusDomain }
   */
  async generateStudyPlan(payload) {
    return await api.post(API_ROUTES.ADVISOR.STUDY_PLAN, payload);
  },
};

export default advisorService;
