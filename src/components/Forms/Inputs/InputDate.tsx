import React, { useEffect, useRef, useState } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";

type IconProp = string | React.ReactNode;
type Mode = "single" | "range";

interface InputDateProps {
  /* --- Modo --- */
  mode?: Mode;                    // "single" | "range"  (default: "single")

  /* --- Names para RHF --- */
  // single
  name?: string;
  // range
  nameStart?: string;
  nameEnd?: string;

  /* --- RHF --- */
  register: UseFormRegister<any>;
  // errores
  error?: FieldError;             // single
  errorStart?: FieldError;        // range
  errorEnd?: FieldError;          // range

  /* --- UI --- */
  label?: string;
  placeholder?: string;           // single: "Custom date", range: "Start — End"
  min?: string;                   // YYYY-MM-DD (aplica a single y start)
  max?: string;                   // YYYY-MM-DD (aplica a single y end)
  className?: string;
  mainClassName?: string;
  labelClassName?: string;
  leftIcon?: IconProp;            // default "bi bi-search"
  rightIcon?: IconProp;           // default "bi bi-calendar3"

  /* --- Callbacks opcionales --- */
  onDateChange?: (value: string) => void;                  // single
  onRangeChange?: (start: string, end: string) => void;    // range
}

const InputDate: React.FC<InputDateProps> = ({
  mode = "single",
  name,
  nameStart,
  nameEnd,
  register,
  error,
  errorStart,
  errorEnd,
  label,
  placeholder,
  min,
  max,
  className = "",
  mainClassName = "",
  labelClassName = "",
  leftIcon = "bi bi-search",
  rightIcon = "bi bi-calendar3",
  onDateChange,
  onRangeChange,
}) => {
  const singleRef = useRef<HTMLInputElement | null>(null);
  const startRef  = useRef<HTMLInputElement | null>(null);
  const endRef    = useRef<HTMLInputElement | null>(null);

  const [display, setDisplay] = useState("");

  const fmt = (val: string) => {
    if (!val) return "";
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return val;
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
  };

  const LeftIconNode  = typeof leftIcon  === "string" ? <i className={leftIcon}  /> : leftIcon;
  const RightIconNode = typeof rightIcon === "string" ? <i className={rightIcon} /> : rightIcon;

  // Registers de RHF (condicionales)
  const regSingle = name && mode === "single" ? register(name) : undefined;
  const regStart  = nameStart && mode === "range" ? register(nameStart) : undefined;
  const regEnd    = nameEnd && mode === "range" ? register(nameEnd) : undefined;

  // placeholder por defecto
  const ph = placeholder ?? (mode === "single" ? "Custom date" : "Start — End");

  // Inicializar display desde valores actuales del form (si los hubiera)
  useEffect(() => {
    if (mode === "single") {
      const v = singleRef.current?.value ?? "";
      setDisplay(v ? fmt(v) : "");
    } else {
      const s = startRef.current?.value ?? "";
      const e = endRef.current?.value ?? "";
      setDisplay(s || e ? `${s ? fmt(s) : "…" } — ${e ? fmt(e) : "…"}` : "");
    }
    // no deps: inicializa al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Abrir picker (nativo) según modo
  const openPicker = () => {
    if (mode === "single") {
      singleRef.current?.focus();
      (singleRef.current as any)?.showPicker?.();
    } else {
      // si no hay start, abre start; si ya hay start, abre end
      const s = startRef.current?.value;
      const target = !s ? startRef.current : endRef.current;
      target?.focus();
      (target as any)?.showPicker?.();
    }
  };

  // Handlers
  const onSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    regSingle?.onChange(e);
    setDisplay(fmt(e.target.value));
    onDateChange?.(e.target.value);
  };

  const onStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    regStart?.onChange(e);
    const s = e.target.value;
    const eVal = endRef.current?.value ?? "";
    setDisplay(`${s ? fmt(s) : "…"} — ${eVal ? fmt(eVal) : "…"}`);
    // tras elegir inicio, abrir fin
    endRef.current?.focus();
    (endRef.current as any)?.showPicker?.();
    onRangeChange?.(s, eVal);
  };

  const onEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    regEnd?.onChange(e);
    const sVal = startRef.current?.value ?? "";
    const eVal = e.target.value;
    setDisplay(`${sVal ? fmt(sVal) : "…"} — ${eVal ? fmt(eVal) : "…"}`);
    onRangeChange?.(sVal, eVal);
  };

  // Validación visual (is-invalid) según modo
  const hasError = mode === "single" ? !!error : !!errorStart || !!errorEnd;

  return (
    <div className={mainClassName}>
      {label && (
        <label htmlFor={`${(name || nameStart) ?? "date"}-display`} className={`form-label ${labelClassName}`}>
          {label}
        </label>
      )}

      <div className="position-relative">
        {/* Icono izquierdo */}
        <span
          className="position-absolute top-50 translate-middle-y ms-3 text-secondary"
          style={{ pointerEvents: "none" }}
        >
          {LeftIconNode}
        </span>

        {/* Input visible de solo lectura */}
        <input
          id={`${(name || nameStart) ?? "date"}-display`}
          type="text"
          readOnly
          role="button"
          placeholder={ph}
          value={display}
          onClick={openPicker}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPicker();
            }
          }}
          className={`form-control rounded-pill ps-5 pe-5 ${hasError ? "is-invalid" : ""} ${className}`}
          aria-invalid={hasError}
          aria-describedby={`${(name || nameStart) ?? "date"}-error`}
        />

        {/* Icono derecho (abre calendario) */}
        <button
          type="button"
          className="btn position-absolute top-50 translate-middle-y me-2 p-0"
          style={{ right: 8, width: 32, height: 32 }}
          onClick={openPicker}
          aria-label="Open date picker"
        >
          {RightIconNode}
        </button>

        {/* Inputs reales para RHF (ocultos) */}
        {mode === "single" ? (
          <input
            type="date"
            min={min}
            max={max}
            className="visually-hidden"
            {...(regSingle as any)}
            ref={(el) => {
              regSingle?.ref(el);
              singleRef.current = el;
            }}
            onChange={onSingleChange}
            onBlur={regSingle?.onBlur}
            name={name}
          />
        ) : (
          <>
            <input
              type="date"
              min={min}
              max={max}
              className="visually-hidden"
              {...(regStart as any)}
              ref={(el) => {
                regStart?.ref(el);
                startRef.current = el;
              }}
              onChange={onStartChange}
              onBlur={regStart?.onBlur}
              name={nameStart}
            />
            <input
              type="date"
              min={startRef.current?.value || min}   // end no menor que start (si ya existe)
              max={max}
              className="visually-hidden"
              {...(regEnd as any)}
              ref={(el) => {
                regEnd?.ref(el);
                endRef.current = el;
              }}
              onChange={onEndChange}
              onBlur={regEnd?.onBlur}
              name={nameEnd}
            />
          </>
        )}
      </div>

      {/* Errores */}
      {mode === "single" && error && (
        <div id={`${name}-error`} className="invalid-feedback d-block">{error.message}</div>
      )}
      {mode === "range" && (errorStart || errorEnd) && (
        <div id={`${nameStart}-error`} className="invalid-feedback d-block">
          {errorStart?.message || errorEnd?.message}
        </div>
      )}
    </div>
  );
};

export default InputDate;
