import React from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";
import InputCheckBox from "./InputCheckBox";

export type CheckOption = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
};

export interface CheckboxListProps {
  name: string;
  options: CheckOption[];
  register: UseFormRegister<any>;
  error?: FieldError;
  onChangeItem?: (payload: { value: string; checked: boolean }) => void;
  className?: string;
  gapClassName?: string;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  name,
  options,
  register,
  error,
  onChangeItem,
  className = "",
  gapClassName = "mb-3",
}) => {
  return (
    <div className={className}>
      {options.map((opt) => (
        <div key={opt.value} className={gapClassName}>
          <InputCheckBox
            name={name}
            value={opt.value}
            label={opt.label}
            description={opt.description}
            defaultChecked={opt.defaultChecked}
            disabled={opt.disabled}
            register={register}
            onChange={(checked) =>
              onChangeItem?.({ value: opt.value, checked })
            }
          />
        </div>
      ))}
      {error && (
        <div className="invalid-feedback d-block">{error.message}</div>
      )}
    </div>
  );
};

export default CheckboxList;
