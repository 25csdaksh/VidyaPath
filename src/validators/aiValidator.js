const validateChatMessage = (data) => {
  const errors = [];
  const validModes = [
    'General',
    'Roadmap',
    'Projects',
    'InterviewPractice',
    'ResumeReview',
    'SkillGap',
    'LearningPlan',
    'ProjectGrilling',
  ];

  if (!data.prompt || typeof data.prompt !== 'string' || data.prompt.trim().length === 0) {
    errors.push('Prompt is required.');
  } else if (data.prompt.trim().length < 2) {
    errors.push('Prompt must be at least 2 characters long.');
  } else if (data.prompt.trim().length > 2000) {
    errors.push('Prompt cannot exceed 2000 characters.');
  }

  if (data.mode && !validModes.includes(data.mode)) {
    errors.push(`Invalid mode. Allowed modes: ${validModes.join(', ')}`);
  }

  return errors;
};

module.exports = {
  validateChatMessage,
};
