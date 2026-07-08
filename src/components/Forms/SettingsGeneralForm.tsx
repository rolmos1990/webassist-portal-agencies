import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RowView } from '../RowView';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import InputWithAddon from './Inputs/InputWithAddon';
import { useState } from 'react';
import { UIButton } from '../Button';
import { useTranslation } from 'react-i18next';

export interface SettingsGeneralFormData {
  language: string;
  defaultComissionRate: number;
  renewalComissionRate: number;
  minimiumRenevueTarget: number;
}

const schema = yup.object({
  language: yup.string().required('Language is required'),
  defaultComissionRate: yup.number().required('Default Comission Rate is required'),
  renewalComissionRate: yup.number().required('Renewal Comission Rate is required'),
  minimiumRenevueTarget: yup.number().required('Minimum Revenue Target is required')
});

interface Props {
  initialValues?: SettingsGeneralFormData;
  onSubmit: (data: SettingsGeneralFormData) => void;
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
    formState: { errors },
  } = useForm<SettingsGeneralFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const watched = useWatch({ control });

  const [editable, setEditable] = useState(false);


  const handleFormSubmit = (data: SettingsGeneralFormData) => {
    onSubmit(data);
    reset();
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

      {/* Commission & Revenue */}
      <hr className="border-0" />

      <div className="mt-4 pt-2">
        <h6 className="text-black fw-semibold mb-3 border-bottom pb-2">{t('comission_and_revenue_settings')}</h6>

        <RowView
          label={t('default_commission_rate')}
          hint={''}
          edit={false}
          show={<span>{watched.defaultComissionRate} %</span>}
          editNode={
            <InputWithAddon
              name="defaultComissionRate"
              placeholder="0"
              endAdornment="%"
              register={register}
              error={errors.defaultComissionRate}
              // fuerza number en RHF
              // @ts-expect-error RHF acepta valueAsNumber en register rules
              rules={{ valueAsNumber: true }}
            />
          }
        />

        {/* Renewal Commission */}
        <RowView
          label={t('renewal_commission_rate')}
          hint={t('')}
          edit={false}
          show={<span>{watched.renewalComissionRate} %</span>}
          editNode={
            <InputWithAddon
              name="renewalComissionRate"
              placeholder="0"
              endAdornment="%"
              register={register}
              error={errors.renewalComissionRate}
              // fuerza number en RHF
              // @ts-expect-error RHF acepta valueAsNumber en register rules
              rules={{ valueAsNumber: true }}
            />
          }
        />

        {/* Minimum Revenue Target */}
        <RowView
          label={t('minimum_revenue_target')}
          hint={t('')}
          edit={false}
          show={
            <span>
                {watched.minimiumRenevueTarget ?? 0}
            </span>
          }
          editNode={
            <InputWithAddon
              name="minimiumRenevueTarget"
              placeholder="0"
              endAdornment={"$"}
              register={register}
              error={errors.minimiumRenevueTarget}
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
              >
                {t('guardar')}
              </UIButton>
            </div>
          )}
        </div>
      
          </form>

  );
}
