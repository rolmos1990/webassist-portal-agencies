import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileField, ProfileSection } from '../ProfileSection';
import InputText from './Inputs/InputText';
import InputSwitch from './Inputs/InputSwitch';
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface ProfilePersonalFormData {
  nombre: string;
  apellido: string;
  phone: string;
  whatsapp: string;
  correoAlternativo: string;
  emailNotifications: boolean;
}

const schema = yup.object({
  nombre: yup.string().trim().required('Name is required'),
  apellido: yup.string().trim().required('Last name is required'),
  phone: yup.string().trim().defined().matches(/^\+?[0-9\s-]*$/, 'Invalid phone'),
  whatsapp: yup.string().trim().defined().matches(/^\+?[0-9\s-]*$/, 'Invalid phone'),
  correoAlternativo: yup.string().trim().email('Invalid email').defined(),
  emailNotifications: yup.boolean().required(),
});

// campo de la API -> campo del formulario
const API_FIELD_MAP = {
  nombre: 'nombre',
  apellido: 'apellido',
  telefono: 'phone',
  whatsapp: 'whatsapp',
  correo_renovaciones_alternativo: 'correoAlternativo',
  recibir_correos_renovaciones: 'emailNotifications',
} as const;

interface Props {
  initialValues?: ProfilePersonalFormData;
  /** Sólo lectura: el agente no puede cambiar su propio email */
  email: string;
  /** Sólo lectura: rol ya traducido */
  role: string;
  /** Si rechaza, el formulario sigue en edición y muestra los errores por campo del servicio */
  onSubmit: (data: ProfilePersonalFormData) => Promise<void> | void;
}

export default function ProfilePersonalForm({ initialValues, email, role, onSubmit }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfilePersonalFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  // Los datos llegan/actualizan desde el servicio después del primer render
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const watched = useWatch({ control });
  const [editable, setEditable] = useState(false);

  const handleFormSubmit = async (data: ProfilePersonalFormData) => {
    try {
      await onSubmit(data);
      setEditable(false);
    } catch (e) {
      applyApiFieldErrors(e, setError, API_FIELD_MAP, t);
    }
  };

  const handleCancel = () => {
    reset();
    setEditable(false);
  };

  const textInput = (name: keyof ProfilePersonalFormData, placeholder: string, type: 'text' | 'tel' | 'email' = 'text') => (
    <InputText
      label=""
      name={name}
      type={type}
      placeholder={placeholder}
      register={register}
      error={errors[name]}
      mainClassName="mb-0"
      className="rounded-pill"
    />
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <ProfileSection
        title={t('myProfile.personalInformation')}
        editable={editable}
        submitting={isSubmitting}
        onEdit={() => setEditable(true)}
        onCancel={handleCancel}
      >
        <ProfileField
          label={t('myProfile.firstName')}
          edit={editable}
          show={watched.nombre || '—'}
          editNode={textInput('nombre', t('myProfile.firstName'))}
        />
        <ProfileField
          label={t('myProfile.lastName')}
          edit={editable}
          show={watched.apellido || '—'}
          editNode={textInput('apellido', t('myProfile.lastName'))}
        />
        {/* El servicio de perfil no envía la fecha de nacimiento */}
        <ProfileField label={t('myProfile.dateOfBirth')} show="—" />
        <ProfileField label={t('myProfile.email')} show={email || '—'} />
        <ProfileField
          label={t('myProfile.phone')}
          edit={editable}
          show={watched.phone || '—'}
          editNode={textInput('phone', '+50767891234', 'tel')}
        />
        <ProfileField label={t('myProfile.userRole')} show={role} />
        <ProfileField
          label={t('myProfile.whatsapp')}
          edit={editable}
          show={watched.whatsapp || '—'}
          editNode={textInput('whatsapp', '+50767891234', 'tel')}
        />
        <ProfileField
          label={t('myProfile.renewalEmails')}
          edit={editable}
          show={watched.emailNotifications ? t('myProfile.enabled') : t('myProfile.disabled')}
          editNode={
            <InputSwitch
              label=""
              name="emailNotifications"
              register={register}
              error={errors.emailNotifications}
            />
          }
        />
        <ProfileField
          label={t('myProfile.alternativeRenewalsEmail')}
          edit={editable}
          show={watched.correoAlternativo || '—'}
          editNode={textInput('correoAlternativo', 'email@company.com', 'email')}
        />
      </ProfileSection>
    </form>
  );
}
