import React from 'react';
import { Compass, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <Compass size={20} />
              </div>
              <span className="footer__logo-title">CSE Career Portal</span>
            </div>
            <p className="footer__tagline">
              The centralized, open architecture platform for Computer Science Engineering students.
              Curating resources, career roadmaps, placements, and project ideas.
            </p>
            <div className="footer__socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__social-link" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__social-link" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer__social-link" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">Learning Hub</h4>
            <ul>
              <li><Link to="/about-cse">About CSE</Link></li>
              <li><Link to="/resources/youtube">YouTube Channels</Link></li>
              <li><Link to="/resources/coursera">Coursera Certifications</Link></li>
              <li><Link to="/resources/projects">Project Blueprints</Link></li>
              <li><Link to="/resources/notes">Notes & Cheat Sheets</Link></li>
            </ul>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">Career Acceleration</h4>
            <ul>
              <li><Link to="/roadmaps">Coding Roadmaps</Link></li>
              <li><Link to="/placement-hub">Placement Hub</Link></li>
              <li><Link to="/interview-prep">Interview Preparation</Link></li>
              <li><Link to="/hackathons">Hackathon Hub</Link></li>
              <li><Link to="/resume-builder">ATS Resume Builder</Link></li>
            </ul>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">Platform</h4>
            <ul>
              <li><Link to="/dashboard">Student Dashboard</Link></li>
              <li><Link to="/announcements">Announcements</Link></li>
              <li><Link to="/chatbot">AI Career Chatbot</Link></li>
              <li><Link to="/admin">Admin Moderation</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} CSE Career Portal. Built for Computer Science Engineering Students.
          </p>
          <p className="footer__built-with">
            Engineered with <Heart size={14} className="footer__heart" /> using React, Node.js & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};
