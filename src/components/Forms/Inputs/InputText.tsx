import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';

interface InputTextProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: 'text' | 'tel' | 'password' | 'email';
  /** ✅ Icono opcional que se verá dentro del input */
  icon?: string | React.ReactNode;
  /** ✅ Clase extra para personalizar el label */
  labelClassName?: string;
  mainClassName?: string;
  className?: string;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  placeholder,
  register,
  error,
  type = 'text',
  icon,
  labelClassName = '',
  mainClassName = '',
  className = '',
}) => (
  <div className={mainClassName}>
    <label htmlFor={name} className={`form-label ${labelClassName}`}>
      {label}
    </label>

    <div className="position-relative">
      {icon && (
        <span
          className="position-absolute top-50 translate-middle-y ms-3 text-secondary"
          style={{ pointerEvents: 'none' }}
        >
          {typeof icon === 'string' ? <i className={icon} /> : icon}
        </span>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`form-control rounded-pill ps-${icon ? '5' : '3'} ${error ? 'is-invalid' : ''} ${className}`}
        {...register(name)}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
    </div>

    {error && (
      <div id={`${name}-error`} className="invalid-feedback">
        {error.message}
      </div>
    )}
  </div>
);

export default InputText;
