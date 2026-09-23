import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, UserCheck, Shield, GraduationCap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

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

  const handleQuickFill = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <Badge
          variant="primary"
          style={{
            marginBottom: '0.75rem',
            background: 'var(--aegean-100)',
            color: 'var(--primary-800)',
            borderColor: 'var(--border-color)',
          }}
        >
          <Sparkles size={13} style={{ marginRight: '4px' }} /> Student & Faculty Portal
        </Badge>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '0.4rem',
            letterSpacing: '-0.02em',
          }}
        >
          Welcome Back
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Sign in to access your 4-year CSE roadmap, projects & AI advisor
        </p>
      </div>

      {/* Quick 1-Click Demo Credentials Bar */}
      <div
        style={{
          background: 'var(--aegean-50)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-800)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
          ⚡ 1-Click Demo Login
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => handleQuickFill('student@cse.edu', 'StudentPassword@123')}
            style={{
              padding: '0.45rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.15s ease',
            }}
          >
            <GraduationCap size={14} color="var(--primary-800)" />
            <span>Demo Student</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill('admin@cse.edu', 'AdminPassword@123')}
            style={{
              padding: '0.45rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.15s ease',
            }}
          >
            <Shield size={14} color="var(--primary-800)" />
            <span>Demo Admin</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="College Email Address"
          name="email"
          type="email"
          icon={Mail}
          placeholder="student@cse.edu"
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

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem', marginTop: '-0.25rem' }}>
          <Link
            to="/forgot-password"
            style={{
              fontSize: '0.825rem',
              color: 'var(--primary-800)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={LogIn}
          style={{ width: '100%' }}
        >
          Sign In to Portal
        </Button>
      </form>

      {/* Switch to Sign Up */}
      <div
        style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
        }}
      >
        Don't have an account yet?{' '}
        <Link
          to="/register"
          style={{
            color: 'var(--primary-800)',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <span>Create Student Account</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
