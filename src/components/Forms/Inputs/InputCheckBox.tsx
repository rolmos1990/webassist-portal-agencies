import React from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";

export interface InputCheckBoxProps {
  name: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  value?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  onChange?: (checked: boolean, value?: string) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const InputCheckBox: React.FC<InputCheckBoxProps> = ({
  name,
  label,
  description,
  value,
  register,
  error,
  onChange,
  defaultChecked,
  disabled,
  className = "",
  id,
}) => {
  const rhf = register(name);
  const inputId = id ?? `${name}-${String(value ?? "single")}`;

  return (
    <div className={`form-check d-flex gap-3 align-items-start ${className}`}>
      <input
        id={inputId}
        type="checkbox"
        value={value}
        className={`form-check-input mt-1 ${error ? "is-invalid" : ""}`}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(e) => {
          rhf.onChange(e);
          onChange?.(e.target.checked, value);
        }}
        onBlur={rhf.onBlur}
        name={rhf.name}
        ref={rhf.ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />

      <label htmlFor={inputId} className="form-check-label">
        <div className="fw-semibold">{label}</div>
        {description && (
          <div className="text-body-secondary small mt-1">{description}</div>
        )}
      </label>

      {error && (
        <div id={`${inputId}-error`} className="invalid-feedback d-block">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default InputCheckBox;
