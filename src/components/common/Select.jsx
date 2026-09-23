import React, { forwardRef } from 'react';

export const Select = forwardRef(
  (
    {
      label,
      options = [],
      value,
      onChange,
      error,
      helperText,
      placeholder = 'Select an option...',
      required,
      className = '',
      id,
      name,
      ...props
    },
    ref
  ) => {
    const selectId = id || name || `select_${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`form-group ${className}`.trim()}>
        {label && (
          <label htmlFor={selectId} className="form-label">
            {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="form-select"
          style={{
            borderColor: error ? 'var(--color-danger)' : undefined,
          }}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
        {error && <span className="form-error">{error}</span>}
        {!error && helperText && (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
