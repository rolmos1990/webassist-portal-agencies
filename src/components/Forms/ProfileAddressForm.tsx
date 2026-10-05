import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileField, ProfileSection } from '../ProfileSection';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface ProfileAddressFormData {
  /** id del país como string (valor del <select>); vacío = sin país */
  pais: string;
}

const schema = yup.object({
  pais: yup.string().defined(),
});

// campo de la API -> campo del formulario
const API_FIELD_MAP = { pais: 'pais' } as const;

interface Props {
  initialValues?: ProfileAddressFormData;
  countryOptions: SelectOption[];
  /** Si rechaza, el formulario sigue en edición y muestra los errores por campo del servicio */
  onSubmit: (data: ProfileAddressFormData) => Promise<void> | void;
}

export default function ProfileAddressForm({ initialValues, countryOptions, onSubmit }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileAddressFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  // Los datos llegan/actualizan desde el servicio después del primer render
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const watched = useWatch({ control });
  const [editable, setEditable] = useState(false);
  const countryName = countryOptions.find((o) => String(o.value) === watched.pais)?.label;

  const handleFormSubmit = async (data: ProfileAddressFormData) => {
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

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <ProfileSection
        title={t('myProfile.address')}
        editable={editable}
        submitting={isSubmitting}
        onEdit={() => setEditable(true)}
        onCancel={handleCancel}
      >
        <ProfileField
          label={t('myProfile.country')}
          edit={editable}
          show={countryName || '—'}
          editNode={
            <InputSelect
              label=""
              name="pais"
              options={countryOptions}
              register={register}
              error={errors.pais}
              emptyOptionLabel={t('common.selectCountry')}
              mainClassName="mb-0"
              className="w-auto"
              minWidth={260}
            />
          }
        />
        {/* El servicio de perfil no envía ciudad ni código postal del agente */}
        <ProfileField label={t('myProfile.city')} show="—" />
        <ProfileField label={t('myProfile.postalCode')} show="—" />
      </ProfileSection>
    </form>
  );
}
