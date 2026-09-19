/**
 * Validate user creation/update payload by Admin
 */
const validateAdminUser = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push('Full name is required and must be at least 2 characters long.');
    }
  }

  if (!isUpdate || data.email !== undefined) {
    if (!data.email || typeof data.email !== 'string') {
      errors.push('A valid email address is required.');
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(data.email.trim())) {
        errors.push('Email format is invalid.');
      }
    }
  }

  if (!isUpdate) {
    if (!data.password || typeof data.password !== 'string' || data.password.length < 8) {
      errors.push('Password is required and must be at least 8 characters.');
    }
  } else if (data.password) {
    if (typeof data.password !== 'string' || data.password.length < 8) {
      errors.push('Password must be at least 8 characters if provided.');
    }
  }

  if (data.role !== undefined) {
    if (!['student', 'admin'].includes(data.role)) {
      errors.push('Role must be either "student" or "admin".');
    }
  }

  if (data.isActive !== undefined && typeof data.isActive !== 'boolean') {
    errors.push('isActive must be a boolean.');
  }

  return errors;
};

/**
 * Validate skill creation/update payload by Admin
 */
const validateAdminSkill = (data, isUpdate = false) => {
  const errors = [];

  const validCategories = [
    'Programming Languages',
    'Data Structures & Algorithms',
    'Frontend Development',
    'Backend Development',
    'Database & Storage',
    'DevOps & Cloud',
    'AI / Machine Learning',
    'Cybersecurity',
    'Core Computer Science',
    'Mobile Development',
    'Testing & QA',
  ];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 1) {
      errors.push('Skill name is required.');
    }
  }

  if (!isUpdate || data.category !== undefined) {
    if (!data.category || !validCategories.includes(data.category)) {
      errors.push(`Category must be one of: ${validCategories.join(', ')}`);
    }
  }

  return errors;
};

module.exports = {
  validateAdminUser,
  validateAdminSkill,
};
