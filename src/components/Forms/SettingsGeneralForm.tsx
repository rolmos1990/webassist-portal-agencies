import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RowView } from '../RowView';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import InputWithAddon from './Inputs/InputWithAddon';
import InputText from './Inputs/InputText';
import { useEffect, useState } from 'react';
import { UIButton } from '../Button';
import { useTranslation } from 'react-i18next';
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface SettingsGeneralFormData {
  language: string;
  tipoPago: string;
  ultimoLogin: string;
  whatsapp: string;
  comision: number;
}

const schema = yup.object({
  language: yup.string().required('Language is required'),
  tipoPago: yup.string().defined(),
  ultimoLogin: yup.string().defined(),
  whatsapp: yup.string().trim().defined().matches(/^\+?[0-9\s-]*$/, 'Invalid phone'),
  comision: yup.number().required('Commission is required')
});

// campo de la API -> campo del formulario
const API_FIELD_MAP = { whatsapp: 'whatsapp', idioma: 'language' } as const;

interface Props {
  initialValues?: SettingsGeneralFormData;
  /** Si rechaza, el formulario sigue en edición y muestra los errores por campo del servicio */
  onSubmit: (data: SettingsGeneralFormData) => Promise<void> | void;
  onCancel: () => void;
  isEditable: boolean;
}

const LANGUAGE_OPTS: SelectOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
];

const SELECT_ROWS: Array<{
  label: string;
  name: keyof SettingsGeneralFormData;
  options: SelectOption[];
}> = [
  { label: 'Language', name: 'language', options: LANGUAGE_OPTS }
];


export default function SettingsGeneralForm({ initialValues, onSubmit, onCancel }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SettingsGeneralFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  // Los datos llegan/actualizan desde el servicio después del primer render
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const watched = useWatch({ control });

  const [editable, setEditable] = useState(false);


  const handleFormSubmit = async (data: SettingsGeneralFormData) => {
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
    onCancel();
  };


  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="create-client-form canvas-body-inner d-flex flex-column h-100"
      noValidate
    >

      <h6 className="text-black fw-semibold mb-3 border-bottom pb-2">{t('user_preference')}</h6>

      {/* --- Selects generados por configuración --- */}
      {SELECT_ROWS.map(({ label, name, options }) => (
        <RowView
          key={name as string}
          label={label}
          edit={editable}
          show={<span>{String((watched as any)?.[name] ?? '')}</span>}
          editNode={
            <InputSelect
              label=""
              name={name as string}
              options={options}
              register={register}
              error={errors[name]}
              allowEmptyOption={false}
              mainClassName="mb-0"
              className="w-auto"
              minWidth={260}
            />
          }
        />
      ))}

      {/* Payment Type (read-only, informativo desde el backend) */}
      <RowView
        label="Payment Type"
        edit={false}
        show={<span>{watched.tipoPago || '—'}</span>}
        editNode={<span>{watched.tipoPago || '—'}</span>}
      />

      {/* Last Login (read-only, fecha formateada) */}
      <RowView
        label="Last Login"
        edit={false}
        show={<span>{watched.ultimoLogin || '—'}</span>}
        editNode={<span>{watched.ultimoLogin || '—'}</span>}
      />

      {/* WhatsApp */}
      <RowView
        label="WhatsApp"
        edit={editable}
        show={<span>{watched.whatsapp || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="whatsapp"
            type="tel"
            placeholder="+50767891234"
            register={register}
            error={errors.whatsapp}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Commission */}
      <hr className="border-0" />

      <div className="mt-4 pt-2">
        <h6 className="text-black fw-semibold mb-3 border-bottom pb-2">{t('comission_and_revenue_settings')}</h6>

        <RowView
          label={t('default_commission_rate')}
          hint={''}
          edit={false}
          show={<span>{watched.comision} %</span>}
          editNode={
            <InputWithAddon
              name="comision"
              placeholder="0"
              endAdornment="%"
              register={register}
              error={errors.comision}
              // fuerza number en RHF
              // @ts-expect-error RHF acepta valueAsNumber en register rules
              rules={{ valueAsNumber: true }}
            />
          }
        />
      </div>

      <div className="card-footer bg-transparent d-flex justify-content-end">
          {!editable ? (
            <UIButton
              variant="primary"
              onClick={() => setEditable(true)}
              type="button"
            >
              {t('editar')}
            </UIButton>
          ) : (
            <div className="d-flex gap-2">
              <UIButton
                variant="outline-secondary"
                onClick={() => handleCancel()}
                type="button"
              >
                {t('cancelar')}
              </UIButton>
              <UIButton
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {t('guardar')}
              </UIButton>
            </div>
          )}
        </div>

          </form>

  );
}
