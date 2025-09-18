import React from "react";
import type { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputTextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  mainClassName?: string;
  rules?: RegisterOptions;
}

const InputTextarea: React.FC<InputTextareaProps> = ({
  label,
  name,
  register,
  error,
  placeholder,
  rows = 3,
  maxLength,
  disabled = false,
  className = "",
  mainClassName = "mb-3",
  rules,
}) => (
  <div className={mainClassName}>
    {label && <label htmlFor={name} className="form-label">{label}</label>}
    <textarea
      id={name}
      rows={rows}
      maxLength={maxLength}
      disabled={disabled}
      placeholder={placeholder}
      className={`form-control rounded-3 ${error ? "is-invalid" : ""} ${className}`}
      aria-invalid={!!error}
      aria-describedby={`${name}-error`}
      {...register(name, rules)}
    />
    {error && (
      <div id={`${name}-error`} className="invalid-feedback">
        {error.message}
      </div>
    )}
  </div>
);

export default InputTextarea;