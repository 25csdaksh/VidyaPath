import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, GraduationCap, ArrowRight } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card, CardBody } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !college) {
      setError('Please complete all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      setTimeout(() => {
        login('demo_jwt_token_sample', {
          _id: 'usr_new_1',
          name,
          email,
          role: 'student',
          isVerified: true,
        });
        setIsLoading(false);
        navigate('/dashboard');
      }, 600);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Card variant="bordered" className="auth-card">
      <CardBody>
        <div className="auth-card__header">
          <h2>Create Student Profile</h2>
          <p>Join the unified CSE career platform today</p>
        </div>

        {error && <div className="auth-card__alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-card__form">
          <Input
            label="Full Name"
            placeholder="Alex Mercer"
            value={name}
            onChange={(e) => setName(e.target.value)}
            startIcon={<User size={18} />}
            required
          />

          <Input
            label="College Email Address"
            type="email"
            placeholder="alex.mercer@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startIcon={<Mail size={18} />}
            required
          />

          <Input
            label="College / University Name"
            placeholder="e.g. National Institute of Technology"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            startIcon={<GraduationCap size={18} />}
            required
          />

          <div className="input-group">
            <label className="input-group__label">Graduation Year</label>
            <select
              className="input-group__input"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
            >
              <option value="2025">2025 (4th Year / Final)</option>
              <option value="2026">2026 (3rd Year)</option>
              <option value="2027">2027 (2nd Year)</option>
              <option value="2028">2028 (1st Year / Freshman)</option>
            </select>
          </div>

          <Input
            label="Password (min 8 characters)"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startIcon={<Lock size={18} />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            rightIcon={<ArrowRight size={18} />}
            className="auth-card__submit-btn"
          >
            Create Account
          </Button>
        </form>

        <div className="auth-card__footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-card__link">
              Sign in
            </Link>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
