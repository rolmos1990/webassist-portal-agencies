import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';

interface InputTextProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: 'text' | 'tel' | 'password';
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
  mainClassName='',
  className = '',
}) => (
  <div className={mainClassName}>
    <label htmlFor={name} className="form-label">{label}</label>
    <input
      id={name}
      type={type}
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

export default InputText;