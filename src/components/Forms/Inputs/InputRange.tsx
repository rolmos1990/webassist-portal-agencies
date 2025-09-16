import React from 'react';
import "../../../assets/scss/components/_input-range.scss";


export const InputRange: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}> = ({ label, value, onChange, min = 0, max = 1000, step = 10 }) => {
  const fmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const pct = ((value - min) * 100) / (max - min);

  return (
    <div className="mb-3">
      <label className="form-label d-block">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(ev) => onChange(ev.currentTarget.valueAsNumber)}
        className="form-range range-fill"
        style={{ ['--range' as any]: `${pct}%` }}
      />

      <div className="d-flex justify-content-between small text-muted">
        <span>{fmt.format(value)}</span>
        <span>{fmt.format(max)}</span>
      </div>
    </div>
  );
};
