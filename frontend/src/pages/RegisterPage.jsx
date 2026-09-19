import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, GraduationCap, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

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
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>
        Create Student Account
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        Join VidyaPath to track your 4-year CSE journey
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="name"
          type="text"
          icon={User}
          placeholder="Daksh Sharma"
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
          label="College / University Name"
          name="college"
          type="text"
          icon={Building}
          placeholder="e.g. Institute of Engineering & Tech"
          value={formData.college}
          onChange={handleChange}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="semester" className="form-label">
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              className="form-select"
              value={formData.semester}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="specialization" className="form-label">
              Specialization
            </label>
            <select
              id="specialization"
              name="specialization"
              className="form-select"
              value={formData.specialization}
              onChange={handleChange}
            >
              <option value="General CSE">General CSE</option>
              <option value="Full Stack / Software Engineering">Full Stack</option>
              <option value="AI / ML">AI / ML</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data Science">Data Science</option>
              <option value="Cloud / DevOps">Cloud / DevOps</option>
            </select>
          </div>
        </div>

        <Button type="submit" variant="primary" loading={loading} icon={UserPlus} style={{ width: '100%', marginTop: '0.5rem' }}>
          Create Account
        </Button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Already registered?{' '}
        <Link to="/login" style={{ color: 'var(--primary-400)', fontWeight: 600 }}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
