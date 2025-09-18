import React from "react";
import type { FieldError, UseFormRegister, RegisterOptions } from "react-hook-form";
import "../../../assets/scss/components/_input-switch.scss";

interface InputSwitchProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  mainClassName?: string;
  className?: string;
  disabled?: boolean;
  rules?: RegisterOptions;
  onValueChange?: (checked: boolean) => void;
}

const InputSwitch: React.FC<InputSwitchProps> = ({
  label,
  name,
  register,
  error,
  mainClassName = "mb-3",
  className = "",
  disabled = false,
  rules,
  onValueChange,
}) => {
  return (
    <div className={mainClassName}>
      <label className="form-label d-block mb-2">{label}</label>

      <div className="form-check form-switch switch-lg">
        <input
          id={name}
          type="checkbox"
          disabled={disabled}
          className={`form-check-input ${error ? "is-invalid" : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
          {...register(name, {
            ...(rules || {}),
            onChange: (e) => onValueChange?.(e.target.checked),
          })}
        />
        <label htmlFor={name} className="form-check-label" />
      </div>

      {error && (
        <div id={`${name}-error`} className="invalid-feedback d-block">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default InputSwitch;
