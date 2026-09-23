const validateRoadmapProgress = (data) => {
  const errors = [];
  const { roadmapId } = data;

  if (!roadmapId || typeof roadmapId !== 'string') {
    errors.push({ field: 'roadmapId', message: 'roadmapId is required' });
  }

  return errors;
};

module.exports = {
  validateRoadmapProgress,
};
