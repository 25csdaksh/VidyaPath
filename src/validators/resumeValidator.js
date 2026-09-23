const validateResume = (data, isUpdate = false) => {
  const errors = [];
  const { title, targetRole } = data;

  if (!isUpdate) {
    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      errors.push({ field: 'title', message: 'Resume title cannot be empty' });
    }
    const validRoles = [
      'Software Developer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'AI/ML Engineer',
      'Data Scientist',
      'Cybersecurity Analyst',
      'Cloud/DevOps Engineer',
      'Systems Engineer',
    ];
    if (targetRole && !validRoles.includes(targetRole)) {
      errors.push({ field: 'targetRole', message: `targetRole must be one of: ${validRoles.join(', ')}` });
    }
  }

  return errors;
};

module.exports = {
  validateResume,
};
