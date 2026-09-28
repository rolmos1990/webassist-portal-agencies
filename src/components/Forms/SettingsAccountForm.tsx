import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RowView } from '../RowView';
import { UIButton } from '../Button';
import InputText from './Inputs/InputText';
import InputSwitch from './Inputs/InputSwitch';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface SettingsAccountFormData {
  /** Solo lectura: el agente no puede cambiar su propio email */
  email: string;
  nombre: string;
  apellido: string;
  phone: string;
  /** id del país como string (valor del <select>); vacío = sin país */
  pais: string;
  correoAlternativo: string;
  emailNotifications: boolean;
}

const schema = yup.object({
  email: yup.string().trim().required(),
  nombre: yup.string().trim().required('Name is required'),
  apellido: yup.string().trim().required('Last name is required'),
  phone: yup.string().trim().defined().matches(/^\+?[0-9\s-]*$/, 'Invalid phone'),
  pais: yup.string().defined(),
  correoAlternativo: yup.string().trim().email('Invalid email').defined(),
  emailNotifications: yup.boolean().required(),
});

// campo de la API -> campo del formulario
const API_FIELD_MAP = {
  nombre: 'nombre',
  apellido: 'apellido',
  telefono: 'phone',
  pais: 'pais',
  correo_renovaciones_alternativo: 'correoAlternativo',
  recibir_correos_renovaciones: 'emailNotifications',
} as const;

interface Props {
  initialValues?: Partial<SettingsAccountFormData>;
  countryOptions: SelectOption[];
  /** Si rechaza, el formulario sigue en edición y muestra los errores por campo del servicio */
  onSubmit: (data: SettingsAccountFormData) => Promise<void> | void;
  onCancel: () => void;
  isEditable?: boolean;
}

export default function SettingsAccountForm({
  initialValues,
  countryOptions,
  onSubmit,
  onCancel,
  isEditable = false,
}: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SettingsAccountFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  // Los datos llegan/actualizan desde el servicio después del primer render
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const watched = useWatch({ control });
  const [editable, setEditable] = useState<boolean>(isEditable);
  const onOff = (v?: boolean) => (v ? 'Enabled' : 'Disabled');
  const countryName = countryOptions.find((o) => String(o.value) === watched.pais)?.label;

  const handleFormSubmit = async (data: SettingsAccountFormData) => {
    try {
      await onSubmit(data);
      setEditable(false);
    } catch (e) {
      applyApiFieldErrors(e, setError, API_FIELD_MAP, t);
    }
  };

  const handleCancel = () => {
    reset(); // vuelve a defaults + initialValues
    setEditable(false);
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)} className="d-flex flex-column gap-3" noValidate>
      <h6 className="text-black fw-semibold mb-2 border-bottom pb-2">Account Settings</h6>

      {/* Primary Contact Email (read-only: se cambia sólo desde un administrador) */}
      <RowView
        label="Primary Contact Email"
        edit={false}
        show={<span>{watched.email || '—'}</span>}
        editNode={<span>{watched.email || '—'}</span>}
      />

      {/* Name */}
      <RowView
        label="Name"
        edit={editable}
        show={<span>{watched.nombre || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="nombre"
            placeholder="Name"
            register={register}
            error={errors.nombre}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Last name */}
      <RowView
        label="Last Name"
        edit={editable}
        show={<span>{watched.apellido || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="apellido"
            placeholder="Last Name"
            register={register}
            error={errors.apellido}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Phone */}
      <RowView
        label="Phone"
        edit={editable}
        show={<span>{watched.phone || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="phone"
            type="tel"
            placeholder="+50767891234"
            register={register}
            error={errors.phone}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Country */}
      <RowView
        label="Country"
        edit={editable}
        show={<span>{countryName || '—'}</span>}
        editNode={
          <InputSelect
            label=""
            name="pais"
            options={countryOptions}
            register={register}
            error={errors.pais}
            emptyOptionLabel="Select a country"
            mainClassName="mb-0"
            className="w-auto"
            minWidth={260}
          />
        }
      />

      <hr className="border-0" />
      <h6 className="text-black fw-semibold mb-2 border-bottom pb-2">Notifications and Alerts</h6>
      <RowView
        label="Email Notifications"
        edit={editable}
        show={<span>{onOff(watched.emailNotifications)}</span>}
        editNode={
          <InputSwitch
            label=""
            name="emailNotifications"
            register={register}
            error={errors.emailNotifications}
          />
        }
      />

      {/* Alternative renewals email */}
      <RowView
        label="Alternative Renewals Email"
        edit={editable}
        show={<span>{watched.correoAlternativo || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="correoAlternativo"
            type="email"
            placeholder="email@company.com"
            register={register}
            error={errors.correoAlternativo}
            mainClassName="mb-0"
            className="rounded-pill"
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
            <UIButton variant="primary" type="submit" disabled={isSubmitting}>
              Save
            </UIButton>
          </div>
        )}
      </div>
    </form>
  );
}
