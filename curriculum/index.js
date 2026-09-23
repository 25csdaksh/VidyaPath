const year1 = require('./1st_year_foundation.json');
const year2 = require('./2nd_year_core_cse.json');
const year3 = require('./3rd_year_specialization.json');
const year4 = require('./4th_year_placement_capstone.json');

/**
 * Master Academic & Career Knowledge Base for VidyaPath CSE Portal
 */
const knowledgeBase = {
  1: year1,
  2: year2,
  3: year3,
  4: year4,
};

/**
 * Helper to get recommendations for a student based on year and semester
 * @param {number} year - 1, 2, 3, or 4
 * @param {number} [semester] - Optional 1 to 8
 * @returns {object|null}
 */
function getKnowledgeByYear(year, semester) {
  const data = knowledgeBase[Number(year)];
  if (!data) return null;
  return data;
}

/**
 * Helper to get all recommended books across all 4 years
 */
function getAllBooks() {
  const books = [];
  Object.values(knowledgeBase).forEach((yearData) => {
    yearData.subjects?.forEach((subject) => {
      subject.recommendedBooks?.forEach((b) => {
        books.push({
          ...b,
          year: yearData.year,
          subjectCode: subject.code,
          subjectName: subject.name,
        });
      });
    });
  });
  return books;
}

/**
 * Helper to get all recommended projects across all 4 years
 */
function getAllProjects() {
  const projects = [];
  Object.values(knowledgeBase).forEach((yearData) => {
    yearData.recommendedProjects?.forEach((p) => {
      projects.push({
        ...p,
        year: yearData.year,
        academicLevel: yearData.academicLevel,
      });
    });
  });
  return projects;
}

module.exports = {
  knowledgeBase,
  year1,
  year2,
  year3,
  year4,
  getKnowledgeByYear,
  getAllBooks,
  getAllProjects,
};
