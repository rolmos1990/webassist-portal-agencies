import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';

interface InputEmailProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
  mainClassName?: string;
}

const InputEmail: React.FC<InputEmailProps> = ({
  label,
  name,
  placeholder,
  register,
  error,
  className = '',
  mainClassName = '',
}) => (
  <div className={mainClassName}>
    {label && <label htmlFor={name} className="form-label">{label}</label>}
    <input
      id={name}
      type="email"
      placeholder={placeholder}
      className={`form-control rounded-pill ${error ? 'is-invalid' : ''} ${className}`}
      {...register(name)}
      aria-invalid={!!error}
      aria-describedby={`${name}-error`}
    />
    {error && (
      <div id={`${name}-error`} className="invalid-feedback">
        {error.message}
      </div>
    )}
  </div>
);

export default InputEmail;
