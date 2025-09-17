// InputCheckboxListForm.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { CheckOption } from "./Inputs/InputCheckBoxList";
import CheckboxList from "./Inputs/InputCheckBoxList";

export type CheckboxFormValues = {
  [key: string]: string[];
};

interface Props {
  name?: string;
  options: CheckOption[];
  onSubmit: (values: string[]) => void;
  className?: string;
}

const PermissionsAgentsVertical: React.FC<Props> = ({
  name = "permissions",
  options,
  onSubmit,
  className = "",
}) => {
  const defaultSelected = options
    .filter((o) => o.defaultChecked)
    .map((o) => o.value);

  const { register, watch } = useForm<CheckboxFormValues>({
    defaultValues: { [name]: defaultSelected },
  });

  // Observa cambios y dispara onSubmit automáticamente
  const selected = watch(name) as string[] | undefined;

  useEffect(() => {
    onSubmit(selected ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(selected)]); // asegura disparo por cambios de contenido

  return (
    <form className={className} noValidate>
      <CheckboxList
        name={name}
        options={options}
        register={register}
        onChangeItem={() => { /* no-op: el watch ya envía los cambios */ }}
        className="mt-2"
      />
    </form>
  );
};

export default PermissionsAgentsVertical;
