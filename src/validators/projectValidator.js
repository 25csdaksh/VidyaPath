const validateProject = (data, isUpdate = false) => {
  const errors = [];
  const { title, category, difficulty, description, problemStatement } = data;

  if (!isUpdate) {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Project title is required' });
    }
    if (!category || typeof category !== 'string') {
      errors.push({ field: 'category', message: 'Project category is required' });
    }
    if (!difficulty || !['LOW', 'MEDIUM', 'HIGH'].includes(difficulty)) {
      errors.push({ field: 'difficulty', message: 'Difficulty must be LOW, MEDIUM, or HIGH' });
    }
    if (!description || typeof description !== 'string') {
      errors.push({ field: 'description', message: 'Project description is required' });
    }
    if (!problemStatement || typeof problemStatement !== 'string') {
      errors.push({ field: 'problemStatement', message: 'Problem statement is required' });
    }
  } else {
    if (difficulty && !['LOW', 'MEDIUM', 'HIGH'].includes(difficulty)) {
      errors.push({ field: 'difficulty', message: 'Difficulty must be LOW, MEDIUM, or HIGH' });
    }
  }

  return errors;
};

module.exports = {
  validateProject,
};
