import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';

export interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  register: UseFormRegister<any>;
  error?: FieldError;
  inline?: boolean;
  mainClassName?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  register,
  error,
  inline = true,
  mainClassName = '',
}) => (
  <fieldset className={mainClassName}>
    <legend className="form-label fs-6 d-block mb-2">{label}</legend>
    {options.map((opt) => (
      <div
        key={opt.value}
        className={`form-check ${inline ? 'form-check-inline' : ''}`}
      >
        <input
          className="form-check-input"
          type="radio"
          id={`${name}-${opt.value}`}
          value={opt.value}
          {...register(name)}
        />
        <label className="form-check-label" htmlFor={`${name}-${opt.value}`}>
          {opt.label}
        </label>
      </div>
    ))}
    {error && <div className="text-danger mt-1">{error.message}</div>}
  </fieldset>
);

export default RadioGroup;
