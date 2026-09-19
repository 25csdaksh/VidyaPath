import React, { forwardRef } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, startIcon, endIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`input-group ${error ? 'input-group--error' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="input-group__label">
            {label}
          </label>
        )}
        <div className="input-group__wrapper">
          {startIcon && <span className="input-group__icon input-group__icon--start">{startIcon}</span>}
          <input
            id={inputId}
            ref={ref}
            className={`input-group__input ${startIcon ? 'input-group__input--has-start' : ''} ${
              endIcon ? 'input-group__input--has-end' : ''
            }`}
            {...props}
          />
          {endIcon && <span className="input-group__icon input-group__icon--end">{endIcon}</span>}
        </div>
        {error ? (
          <p className="input-group__error">{error}</p>
        ) : helperText ? (
          <p className="input-group__helper">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
