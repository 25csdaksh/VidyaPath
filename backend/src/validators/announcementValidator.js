const validateAnnouncement = (data, isUpdate = false) => {
  const errors = [];
  const { title, description, category } = data;

  if (!isUpdate) {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Announcement title is required' });
    }
    if (!description || typeof description !== 'string') {
      errors.push({ field: 'description', message: 'Announcement description is required' });
    }
    const validCategories = [
      'Hackathons',
      'Internships',
      'Placements',
      'Courses',
      'Workshops',
      'Competitions',
      'CSE Events',
      'Deadlines',
    ];
    if (!category || !validCategories.includes(category)) {
      errors.push({ field: 'category', message: `Category must be one of: ${validCategories.join(', ')}` });
    }
  }

  return errors;
};

module.exports = {
  validateAnnouncement,
};
