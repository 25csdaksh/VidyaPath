const validateRegister = (data) => {
  const errors = [];
  const { name, email, password } = data;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (name.trim().length < 2 || name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be between 2 and 100 characters' });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
  }

  return errors;
};

const validateLogin = (data) => {
  const errors = [];
  const { email, password } = data;

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email address is required' });
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
};

const validateForgotPassword = (data) => {
  const errors = [];
  const { email } = data;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  return errors;
};

const validateResetPassword = (data) => {
  const errors = [];
  const { token, newPassword } = data;

  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    errors.push({ field: 'token', message: 'Password reset token is required' });
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    errors.push({ field: 'newPassword', message: 'New password must be at least 8 characters long' });
  }

  return errors;
};

const validateChangePassword = (data) => {
  const errors = [];
  const { currentPassword, newPassword } = data;

  if (!currentPassword || typeof currentPassword !== 'string') {
    errors.push({ field: 'currentPassword', message: 'Current password is required' });
  }

  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    errors.push({ field: 'newPassword', message: 'New password must be at least 8 characters long' });
  }

  if (currentPassword === newPassword) {
    errors.push({ field: 'newPassword', message: 'New password cannot be the same as current password' });
  }

  return errors;
};

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateChangePassword,
};
