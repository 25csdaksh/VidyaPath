import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Clock, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ModulePlaceholder.css';

interface ModulePlaceholderProps {
  moduleName: string;
  category: string;
  targetPhase: string;
  description: string;
  upcomingFeatures: string[];
}

export const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({
  moduleName,
  category,
  targetPhase,
  description,
  upcomingFeatures,
}) => {
  return (
    <div className="module-placeholder">
      <PageHeader
        title={moduleName}
        description={description}
        badge={<Badge variant="brand">{category}</Badge>}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: moduleName },
        ]}
      />

      <div className="module-placeholder__grid">
        <Card variant="brand" className="module-placeholder__main-card">
          <CardBody>
            <div className="module-placeholder__status-box">
              <Clock size={22} className="module-placeholder__clock-icon" />
              <div>
                <span className="module-placeholder__status-tag">Foundation Ready • Backend Schemas Configured</span>
                <h3>{moduleName} is scheduled in {targetPhase}</h3>
              </div>
            </div>

            <p className="module-placeholder__text">
              The foundational data schemas, API contracts, and design tokens for <strong>{moduleName}</strong> have
              been established in the platform architecture. Full UI interactions and live integrations will be rolled
              out sequentially according to the development roadmap.
            </p>

            <div className="module-placeholder__features-section">
              <h4>Planned Capabilities:</h4>
              <div className="module-placeholder__features-list">
                {upcomingFeatures.map((feature, idx) => (
                  <div key={idx} className="module-placeholder__feature-item">
                    <CheckCircle2 size={16} className="module-placeholder__feature-check" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="module-placeholder__actions">
              <Link to="/">
                <Button variant="secondary" size="md" leftIcon={<ArrowLeft size={16} />}>
                  Back to Hub Overview
                </Button>
              </Link>
              <Link to="/about-cse">
                <Button variant="primary" size="md" leftIcon={<Sparkles size={16} />}>
                  Explore CSE Curriculum Guide
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
