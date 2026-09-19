import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const Dropdown = ({
  trigger,
  label = 'Options',
  items = [],
  align = 'right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`dropdown-container ${className}`.trim()} ref={dropdownRef}>
      {trigger ? (
        <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
      ) : (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{label}</span>
          <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      )}

      {isOpen && (
        <div
          className="dropdown-menu"
          style={{ [align === 'left' ? 'left' : 'right']: 0 }}
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            if (item.divider) {
              return <div key={idx} style={{ height: '1px', background: 'var(--border-color)', margin: '0.25rem 0' }} />;
            }
            return (
              <button
                key={idx}
                className="dropdown-item"
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
              >
                {Icon && <Icon size={16} color="var(--text-muted)" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
