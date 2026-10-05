import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileField, ProfileSection } from '../ProfileSection';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface ProfileLanguageFormData {
  language: string;
}

const schema = yup.object({
  language: yup.string().required('Language is required'),
});

// campo de la API -> campo del formulario
const API_FIELD_MAP = { idioma: 'language' } as const;

// Mismas opciones que SettingsGeneralForm
const LANGUAGE_OPTS: SelectOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
];

interface Props {
  initialValues?: ProfileLanguageFormData;
  /** Si rechaza, el formulario sigue en edición y muestra los errores por campo del servicio */
  onSubmit: (data: ProfileLanguageFormData) => Promise<void> | void;
}

export default function ProfileLanguageForm({ initialValues, onSubmit }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileLanguageFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  // Los datos llegan/actualizan desde el servicio después del primer render
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const watched = useWatch({ control });
  const [editable, setEditable] = useState(false);
  const languageName = LANGUAGE_OPTS.find((o) => o.value === watched.language)?.label;

  const handleFormSubmit = async (data: ProfileLanguageFormData) => {
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
        title={t('myProfile.languageSettings')}
        editable={editable}
        submitting={isSubmitting}
        onEdit={() => setEditable(true)}
        onCancel={handleCancel}
      >
        <ProfileField
          label={t('myProfile.language')}
          edit={editable}
          show={languageName || '—'}
          editNode={
            <InputSelect
              label=""
              name="language"
              options={LANGUAGE_OPTS}
              register={register}
              error={errors.language}
              allowEmptyOption={false}
              mainClassName="mb-0"
              className="w-auto"
              minWidth={260}
            />
          }
        />
      </ProfileSection>
    </form>
  );
}
