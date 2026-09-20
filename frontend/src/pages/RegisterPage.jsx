import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, GraduationCap, UserPlus, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    semester: '1',
    specialization: 'General CSE',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await register({
      ...formData,
      semester: Number(formData.semester),
    });
    setLoading(false);

    if (result.success) {
      navigate('/dashboard', { replace: true });
    }
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
          <Sparkles size={13} style={{ marginRight: '4px' }} /> Student Registration
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
          Create Student Account
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Join VidyaPath to unlock full 4-year CSE roadmap, projects & AI advisor
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="name"
          type="text"
          icon={User}
          placeholder="e.g. Daksh Patel"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          label="Password (min. 8 characters)"
          name="password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Input
          label="College / Institute Name"
          name="college"
          type="text"
          icon={Building}
          placeholder="e.g. National Institute of Technology"
          value={formData.college}
          onChange={handleChange}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <label
              htmlFor="semester"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.4rem',
              }}
            >
              Academic Semester
            </label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: 600,
                outline: 'none',
              }}
            >
              <option value={1}>Semester 1 (1st Year)</option>
              <option value={2}>Semester 2 (1st Year)</option>
              <option value={3}>Semester 3 (2nd Year)</option>
              <option value={4}>Semester 4 (2nd Year)</option>
              <option value={5}>Semester 5 (3rd Year)</option>
              <option value={6}>Semester 6 (3rd Year)</option>
              <option value={7}>Semester 7 (Final Year)</option>
              <option value={8}>Semester 8 (Final Year)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="specialization"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.4rem',
              }}
            >
              Target Track
            </label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: 600,
                outline: 'none',
              }}
            >
              <option value="General CSE">General CSE</option>
              <option value="Full Stack / Software Engineering">Full Stack / SDE</option>
              <option value="AI / ML">AI / ML</option>
              <option value="Cloud / DevOps">Cloud / DevOps</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={UserPlus}
          style={{ width: '100%', marginTop: '0.5rem' }}
        >
          Create Student Account
        </Button>
      </form>

      {/* Switch to Login */}
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
        Already have an account?{' '}
        <Link
          to="/login"
          style={{
            color: 'var(--primary-800)',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <span>Sign In</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
