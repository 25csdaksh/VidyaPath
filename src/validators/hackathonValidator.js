const validateHackathon = (data, isUpdate = false) => {
  const errors = [];
  const { name, organizer, description, registrationUrl, startDate, endDate, registrationDeadline } = data;

  if (!isUpdate) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Hackathon name is required' });
    }
    if (!organizer || typeof organizer !== 'string' || organizer.trim().length === 0) {
      errors.push({ field: 'organizer', message: 'Organizer is required' });
    }
    if (!description || typeof description !== 'string') {
      errors.push({ field: 'description', message: 'Description is required' });
    }
    if (!registrationUrl || typeof registrationUrl !== 'string') {
      errors.push({ field: 'registrationUrl', message: 'Registration URL is required' });
    }
    if (!startDate) {
      errors.push({ field: 'startDate', message: 'Start date is required' });
    }
    if (!endDate) {
      errors.push({ field: 'endDate', message: 'End date is required' });
    }
    if (!registrationDeadline) {
      errors.push({ field: 'registrationDeadline', message: 'Registration deadline is required' });
    }
  }

  return errors;
};

module.exports = {
  validateHackathon,
};
