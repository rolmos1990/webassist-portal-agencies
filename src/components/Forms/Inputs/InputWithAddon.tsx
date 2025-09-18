import React from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";

interface InputWithAddonProps {
  label?: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  /** Contenido a la derecha: %, USD, ícono, etc. */
  endAdornment?: React.ReactNode;
  /** Tipo de input, por defecto text */
  type?: string;
  className?: string;
  mainClassName?: string;
  labelClassName?: string;
}

const InputWithAddon: React.FC<InputWithAddonProps> = ({
  label,
  name,
  placeholder,
  register,
  error,
  endAdornment,
  type = "text",
  className = "",
  mainClassName = "",
  labelClassName = "",
}) => (
  <div className={mainClassName}>
    {label && (
      <label htmlFor={name} className={`form-label ${labelClassName}`}>
        {label}
      </label>
    )}

    <div className="input-group">
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        {...register(name)}
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
      />
      {endAdornment && (
        <span className="input-group-text">{endAdornment}</span>
      )}
      {error && (
        <div id={`${name}-error`} className="invalid-feedback">
          {error.message}
        </div>
      )}
    </div>
  </div>
);

export default InputWithAddon;