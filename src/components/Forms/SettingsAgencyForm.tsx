import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

import { RowView } from '../RowView';
import { UIButton } from '../Button';
import InputText from './Inputs/InputText';
import InputTextarea from './Inputs/InputTextArea';

export interface SettingsAgencyFormData {
  nombrePadre: string;
  nombre: string;
  razonSocial: string;
  ruc: string;
  telefono: string;
  email: string;
  direccion: string;
}

const schema = yup.object({
  nombrePadre: yup.string().trim().optional(),
  nombre: yup.string().trim().required('Agency name is required'),
  razonSocial: yup.string().trim().optional(),
  ruc: yup.string().trim().optional(),
  telefono: yup.string().trim().optional().matches(/^\+?[0-9\s-]*$/, 'Invalid phone'),
  email: yup.string().trim().email('Invalid email').optional(),
  direccion: yup.string().trim().optional(),
});

interface Props {
  initialValues?: Partial<SettingsAgencyFormData>;
  onSubmit: (data: SettingsAgencyFormData) => void;
  onCancel: () => void;
  isEditable?: boolean;
}

export default function SettingsAgencyForm({
  initialValues,
  onSubmit,
  onCancel,
  isEditable = false,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SettingsAgencyFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const watched = useWatch({ control });
  const [editable, setEditable] = useState<boolean>(isEditable);

  const handleFormSubmit = (data: SettingsAgencyFormData) => {
    onSubmit(data);
    setEditable(false);
  };

  const handleCancel = () => {
    reset();
    setEditable(false);
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)} className="d-flex flex-column gap-3" noValidate>
      <h6 className="text-black fw-semibold mb-2 border-bottom pb-2">Agency Settings</h6>

      {/* Name of Primary Producer / Agency */}
      <RowView
        label="Name of Primary Producer / Agency"
        edit={editable}
        show={<span>{watched.nombrePadre || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="nombrePadre"
            placeholder="Name of Primary Producer / Agency"
            register={register}
            error={errors.nombrePadre}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Agency Name */}
      <RowView
        label="Agency Name"
        edit={editable}
        show={<span>{watched.nombre || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="nombre"
            placeholder="Agency Name"
            register={register}
            error={errors.nombre}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Legal Name (Razón Social) */}
      <RowView
        label="Legal Name (Razón Social)"
        edit={editable}
        show={<span>{watched.razonSocial || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="razonSocial"
            placeholder="Legal Name"
            register={register}
            error={errors.razonSocial}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* RUC / TIN / DNI */}
      <RowView
        label="RUC / TIN / DNI"
        edit={editable}
        show={<span>{watched.ruc || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="ruc"
            placeholder="RUC / TIN / DNI"
            register={register}
            error={errors.ruc}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Phone */}
      <RowView
        label="Phone"
        edit={editable}
        show={<span>{watched.telefono || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="telefono"
            type="tel"
            placeholder="+50767891234"
            register={register}
            error={errors.telefono}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Email */}
      <RowView
        label="Email"
        edit={editable}
        show={<span>{watched.email || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="email"
            type="email"
            placeholder="email@company.com"
            register={register}
            error={errors.email}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Address */}
      <RowView
        label="Address"
        edit={editable}
        show={<span style={{ whiteSpace: 'pre-line' }}>{watched.direccion || '—'}</span>}
        editNode={
          <InputTextarea
            label=""
            name="direccion"
            placeholder="Street, building, apartment, city…"
            rows={3}
            maxLength={300}
            register={register}
            error={errors.direccion}
            mainClassName="mb-0"
            className="rounded-3"
          />
        }
      />

      <div className="bg-transparent d-flex justify-content-end mt-2">
        {!editable ? (
          <UIButton variant="primary" onClick={() => setEditable(true)} type="button">
            Edit
          </UIButton>
        ) : (
          <div className="d-flex gap-2">
            <UIButton variant="outline-secondary" onClick={handleCancel} type="button">
              Cancel
            </UIButton>
            <UIButton variant="primary" type="submit">
              Save
            </UIButton>
          </div>
        )}
      </div>
    </form>
  );
}
