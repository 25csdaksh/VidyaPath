import React, { useState, useEffect } from 'react';
import {
  User,
  Save,
  Lock,
  GraduationCap,
  GitBranch,
  Globe,
  Code,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import ErrorState from '../components/feedback/ErrorState';
import profileService from '../services/profileService';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getErrorDetails } from '../utils/errorHandler';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState({
    college: '',
    branch: 'Computer Science and Engineering',
    year: 'TY',
    semester: 5,
    graduationYear: 2026,
    bio: '',
    careerGoal: '',
    targetRole: '',
    targetCompanies: '',
    github: '',
    linkedin: '',
    leetcode: '',
    codeforces: '',
    skills: [],
  });

  const [skillsInput, setSkillsInput] = useState('');
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  const fetchProfile = async () => {
    setIsLoading(true);
    setErrorDetails(null);
    try {
      const res = await profileService.getProfile();
      const pData = res.data?.profile || res.data || {};
      setProfile({
        college: pData.college || '',
        branch: pData.branch || 'Computer Science and Engineering',
        year: pData.year || 'TY',
        semester: pData.semester || 5,
        graduationYear: pData.graduationYear || 2026,
        bio: pData.bio || '',
        careerGoal: pData.careerGoal || '',
        targetRole: pData.targetRole || '',
        targetCompanies: Array.isArray(pData.targetCompanies) ? pData.targetCompanies.join(', ') : (pData.targetCompanies || ''),
        github: pData.github || '',
        linkedin: pData.linkedin || '',
        leetcode: pData.leetcode || '',
        codeforces: pData.codeforces || '',
        skills: pData.skills || [],
      });
      if (pData.skills && Array.isArray(pData.skills)) {
        setSkillsInput(pData.skills.map((s) => (typeof s === 'string' ? s : s.name)).join(', '));
      }
    } catch (err) {
      setErrorDetails(getErrorDetails(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...profile,
        targetCompanies: profile.targetCompanies
          ? profile.targetCompanies.split(',').map((c) => c.trim()).filter(Boolean)
          : [],
        skills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      };
      await profileService.updateProfile(payload);
      showToast('Profile and Career Goal updated successfully!', 'success');
    } catch (err) {
      const details = getErrorDetails(err);
      showToast(details.message || 'Failed to update profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    setIsChangingPass(true);
    try {
      await authService.changePassword(passwordData.currentPassword, passwordData.newPassword);
      showToast('Password changed successfully!', 'success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const details = getErrorDetails(err);
      showToast(details.message || 'Failed to change password.', 'error');
    } finally {
      setIsChangingPass(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="page-header-flex">
        <div className="page-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Badge variant="primary"><User size={14} /> Student Profile</Badge>
            <Badge variant="neutral">{user?.role || 'Student'}</Badge>
          </div>
          <h1>Account & Academic Profile</h1>
          <p>
            Update your university details, competitive programming handles, GitHub repository links, and technical skillsets.
          </p>
        </div>
      </div>

      {/* 4 States Handling */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Skeleton height={280} variant="rounded" />
          <Skeleton height={200} variant="rounded" />
        </div>
      ) : errorDetails ? (
        <ErrorState error={errorDetails} onRetry={fetchProfile} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Main Profile Form */}
          <Card style={{ padding: '2rem' }}>
            <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Academic & Contact Information
                </h2>
                <Badge variant="success">Registered Email: {user?.email}</Badge>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <Input
                  label="Full Name"
                  value={user?.name || ''}
                  disabled
                />
                <Input
                  label="University / College Name"
                  placeholder="e.g. National Institute of Technology"
                  value={profile.college}
                  onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                />
                <Input
                  label="Branch / Major"
                  value={profile.branch}
                  onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Input
                    label="Academic Year"
                    placeholder="e.g. FY, SY, TY, FINAL_YEAR"
                    value={profile.year}
                    onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                    style={{ flex: 1 }}
                  />
                  <Input
                    label="Semester (1-8)"
                    type="number"
                    min={1}
                    max={8}
                    value={profile.semester}
                    onChange={(e) => setProfile({ ...profile, semester: parseInt(e.target.value, 10) || 1 })}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Short Bio"
                  placeholder="e.g., Aspiring Backend Engineer passionate about distributed systems and performance optimization."
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Sparkles size={18} color="var(--primary-700)" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Career Goals & Aspirations
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  <Input
                    label="Primary Career Goal"
                    placeholder="e.g. Crack SDE-1 / Tier-1 Product Role by 2026"
                    value={profile.careerGoal}
                    onChange={(e) => setProfile({ ...profile, careerGoal: e.target.value })}
                  />
                  <Input
                    label="Target Job Role"
                    placeholder="e.g. Full Stack Developer, DevOps Engineer, Data Scientist"
                    value={profile.targetRole}
                    onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
                  />
                  <Input
                    label="Target Dream Companies (Comma separated)"
                    placeholder="e.g. Google, Microsoft, Amazon, Atlassian, Stripe"
                    value={profile.targetCompanies}
                    onChange={(e) => setProfile({ ...profile, targetCompanies: e.target.value })}
                  />
                  <Input
                    label="Expected Graduation Year"
                    type="number"
                    min={2020}
                    max={2035}
                    value={profile.graduationYear}
                    onChange={(e) => setProfile({ ...profile, graduationYear: parseInt(e.target.value, 10) || 2026 })}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  Competitive & Social Profiles
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  <Input
                    label="GitHub Profile URL"
                    placeholder="https://github.com/username"
                    value={profile.github}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    icon={GitBranch}
                  />
                  <Input
                    label="LinkedIn Profile URL"
                    placeholder="https://linkedin.com/in/username"
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    icon={Globe}
                  />
                  <Input
                    label="LeetCode Username / URL"
                    placeholder="https://leetcode.com/username"
                    value={profile.leetcode}
                    onChange={(e) => setProfile({ ...profile, leetcode: e.target.value })}
                    icon={Code}
                  />
                  <Input
                    label="Codeforces Handle"
                    placeholder="e.g. touriste"
                    value={profile.codeforces}
                    onChange={(e) => setProfile({ ...profile, codeforces: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <Input
                  label="Technical Skills (Comma separated)"
                  placeholder="e.g. C++, Java, Python, React, PostgreSQL, Docker, Redis, Kubernetes"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <Button type="submit" variant="primary" size="lg" icon={Save} isLoading={isSaving}>
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </Card>

          {/* Change Password Card */}
          <Card style={{ padding: '2rem' }}>
            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <Lock size={20} color="var(--primary-800)" />
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Security & Password Update
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="secondary" icon={Lock} isLoading={isChangingPass}>
                  Update Password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
