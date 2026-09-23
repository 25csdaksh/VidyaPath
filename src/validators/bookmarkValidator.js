const validateBookmark = (data) => {
  const errors = [];
  const { resourceType, resourceId } = data;

  const validTypes = [
    'Project',
    'InterviewQuestion',
    'DSAProblem',
    'Book',
    'Course',
    'YouTubeResource',
    'Resource',
    'Roadmap',
    'Hackathon',
  ];

  if (!resourceType || !validTypes.includes(resourceType)) {
    errors.push({ field: 'resourceType', message: `resourceType must be one of: ${validTypes.join(', ')}` });
  }

  if (!resourceId || typeof resourceId !== 'string') {
    errors.push({ field: 'resourceId', message: 'resourceId is required' });
  }

  return errors;
};

const validateBookmarkCollection = (data) => {
  const errors = [];
  const { name } = data;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Collection name is required' });
  }

  return errors;
};

module.exports = {
  validateBookmark,
  validateBookmarkCollection,
};
