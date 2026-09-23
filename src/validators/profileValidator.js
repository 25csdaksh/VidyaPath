const validateUpdateProfile = (data) => {
  const errors = [];
  const { semester, graduationYear, specialization, bio } = data;

  if (semester !== undefined) {
    const semNum = Number(semester);
    if (isNaN(semNum) || semNum < 1 || semNum > 8) {
      errors.push({ field: 'semester', message: 'Semester must be a number between 1 and 8' });
    }
  }

  if (graduationYear !== undefined && graduationYear !== null && graduationYear !== '') {
    const gradYearNum = Number(graduationYear);
    if (isNaN(gradYearNum) || gradYearNum < 2000 || gradYearNum > 2040) {
      errors.push({ field: 'graduationYear', message: 'Please provide a realistic graduation year' });
    }
  }

  if (bio !== undefined && typeof bio === 'string' && bio.length > 600) {
    errors.push({ field: 'bio', message: 'Bio cannot exceed 600 characters' });
  }

  const allowedSpecializations = [
    'Full Stack / Software Engineering',
    'AI / ML',
    'Cybersecurity',
    'Data Science',
    'Cloud / DevOps',
    'IoT / Embedded',
    'Mobile Development',
    'Blockchain / Web3',
    'Systems & Distributed Computing',
    'General CSE',
  ];

  if (specialization && !allowedSpecializations.includes(specialization)) {
    errors.push({ field: 'specialization', message: 'Invalid specialization selected' });
  }

  return errors;
};

module.exports = {
  validateUpdateProfile,
};
