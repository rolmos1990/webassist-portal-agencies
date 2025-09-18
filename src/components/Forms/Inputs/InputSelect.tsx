import React from 'react';
import type { FieldError, UseFormRegister, RegisterOptions } from 'react-hook-form';

export type SelectOption = {
  value: string | number;
  label: string;
};

interface InputSelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  register: UseFormRegister<any>;
  error?: FieldError;
  /** Muestra una opción vacía al inicio (value="") */
  allowEmptyOption?: boolean;
  /** Texto de la opción vacía (por defecto: "Select an option") */
  emptyOptionLabel?: string;
  /** Clases del wrapper contenedor */
  mainClassName?: string;
  /** Clases extra para el <select> */
  className?: string;
  /** Deshabilitar el control */
  disabled?: boolean;
  /** Reglas extra de RHF (normalmente usas yupResolver, es opcional) */
  rules?: RegisterOptions;
  /** Callback opcional para escuchar cambios (además del estado de RHF) */
  onValueChange?: (value: string) => void;
  /** ➕ mínimo ancho del select (ej: 220, "16rem", "60%") */
  minWidth?: number | string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  name,
  options,
  register,
  error,
  allowEmptyOption = true,
  emptyOptionLabel = 'Select an option',
  mainClassName = 'mb-3',
  className = '',
  disabled = false,
  rules,
  onValueChange,
  minWidth,
}) => {
  
  const minW =
  typeof minWidth === 'number' ? `${minWidth}px` : minWidth || undefined;

  return (
    <div className={mainClassName}>
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        id={name}
        disabled={disabled}
        className={`form-select rounded-pill ${error ? 'is-invalid' : ''} ${className}`}
        style={{ minWidth: minW }} 
        aria-invalid={!!error}
        aria-describedby={`${name}-error`}
        {...register(name, {
          ...(rules || {}),
          onChange: (e) => onValueChange?.(e.target.value),
        })}
      >
        {allowEmptyOption && <option value="">{emptyOptionLabel}</option>}
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <div id={`${name}-error`} className="invalid-feedback">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default InputSelect;
