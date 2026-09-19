import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>
        Welcome Back
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem', textAlign: 'center' }}>
        Sign in to your CSE Career Portal account
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          name="email"
          type="email"
          icon={Mail}
          placeholder="student@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.825rem', color: 'var(--primary-400)' }}>
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" loading={loading} icon={LogIn} style={{ width: '100%' }}>
          Sign In
        </Button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: 'var(--primary-400)', fontWeight: 600 }}>
          Create one now
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
