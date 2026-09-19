import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card, CardBody } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      // For initial foundation: simulate or connect to auth endpoint
      setTimeout(() => {
        login('demo_jwt_token_sample', {
          _id: 'usr_demo_1',
          name: email.split('@')[0] || 'Student',
          email: email,
          role: 'student',
          isVerified: true,
        });
        setIsLoading(false);
        navigate('/dashboard');
      }, 600);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const fillDemoAccount = (role: 'student' | 'admin') => {
    if (role === 'student') {
      setEmail('alex.student@cse.edu');
      setPassword('Password@123');
    } else {
      setEmail('admin@cse.edu');
      setPassword('Admin@123');
    }
  };

  return (
    <Card variant="bordered" className="auth-card">
      <CardBody>
        <div className="auth-card__header">
          <h2>Welcome back</h2>
          <p>Sign in to your CSE Career account to continue learning</p>
        </div>

        {error && <div className="auth-card__alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-card__form">
          <Input
            label="College Email Address"
            type="email"
            placeholder="student@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startIcon={<Mail size={18} />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startIcon={<Lock size={18} />}
            required
          />

          <div className="auth-card__row">
            <label className="auth-card__remember">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="auth-card__forgot">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            rightIcon={<ArrowRight size={18} />}
            className="auth-card__submit-btn"
          >
            Sign In to Portal
          </Button>
        </form>

        <div className="auth-card__demo-helper">
          <span>Quick Demo Fill:</span>
          <div className="auth-card__demo-btns">
            <button type="button" onClick={() => fillDemoAccount('student')}>
              Student Account
            </button>
            <button type="button" onClick={() => fillDemoAccount('admin')}>
              Admin Account
            </button>
          </div>
        </div>

        <div className="auth-card__footer">
          <p>
            Don't have an account yet?{' '}
            <Link to="/register" className="auth-card__link">
              Create account
            </Link>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
