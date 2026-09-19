import React, { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      type = 'text',
      className = '',
      id,
      name,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || name || `input_${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`form-group ${className}`.trim()}>
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
          </label>
        )}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {Icon && (
            <div
              style={{
                position: 'absolute',
                left: '0.85rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <Icon size={18} />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            required={required}
            className="form-input"
            style={{
              paddingLeft: Icon ? '2.5rem' : '0.95rem',
              borderColor: error ? 'var(--color-danger)' : undefined,
            }}
            {...props}
          />
        </div>
        {error && <span className="form-error">{error}</span>}
        {!error && helperText && (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
