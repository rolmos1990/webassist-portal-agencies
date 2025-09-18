import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RowView } from '../RowView';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import InputWithAddon from './Inputs/InputWithAddon';
import { useMemo, useState } from 'react';
import { UIButton } from '../Button';

export interface SettingsGeneralFormData {
  language: string;
  timeZone: string;
  dateFormat: string;
  currency: string;
  defaultComissionRate: number;
  renewalComissionRate: number;
  minimiumRenevueTarget: number;
}

const schema = yup.object({
  language: yup.string().required('Language is required'),
  timeZone: yup.string().required('Time Zone is required'),
  dateFormat: yup.string().required('Date Format is required'),
  currency: yup.string().required('Currency is required'),
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
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
];

const TZ_OPTS: SelectOption[] = [
  { value: 'America/Panama', label: '(GMT-5) America/Panama' },
];

const DATE_OPTS: SelectOption[] = [{ value: 'dd/mm/yyyy', label: 'dd/mm/yyyy' }];

const CURRENCY_OPTS: SelectOption[] = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];

const SELECT_ROWS: Array<{
  label: string;
  name: keyof SettingsGeneralFormData;
  options: SelectOption[];
}> = [
  { label: 'Language', name: 'language', options: LANGUAGE_OPTS },
  { label: 'Time Zone', name: 'timeZone', options: TZ_OPTS },
  { label: 'Date format', name: 'dateFormat', options: DATE_OPTS },
  { label: 'Currency Settings', name: 'currency', options: CURRENCY_OPTS },
];


export default function SettingsGeneralForm({ initialValues, onSubmit, onCancel }: Props) {
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
  const currency = watched.currency ?? 'USD';

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


  const moneyFmt = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency }),
    [currency]
  );


  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="create-client-form canvas-body-inner d-flex flex-column h-100"
      noValidate
    >
                   
      <h6 className="text-black fw-semibold mb-3 border-bottom pb-2">User Preference</h6>
      
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
        <h6 className="text-black fw-semibold mb-3 border-bottom pb-2">Commission and Revenue Settings</h6>

        <RowView
          label="Default Commission Rate (%)"
          hint="Input for the percentage commission assigned to new agents."
          edit={editable}
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
          label="Renewal Commission Rate (%)"
          hint="Input for commissions on policy renewals."
          edit={editable}
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
          label="Minimum Revenue Target"
          hint="Set baseline targets for agents or agencies."
          edit={editable}
          show={
            <span>
                {moneyFmt.format(watched.minimiumRenevueTarget ?? 0)} {currency}
            </span>
          }
          editNode={
            <InputWithAddon
              name="minimiumRenevueTarget"
              placeholder="0"
              endAdornment={currency}
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
              Edit
            </UIButton>
          ) : (
            <div className="d-flex gap-2">
              <UIButton
                variant="outline-secondary"
                onClick={() => handleCancel()}
                type="button"
              >
                Cancel
              </UIButton>
              <UIButton
                variant="primary"
                type="submit"
              >
                Save
              </UIButton>
            </div>
          )}
        </div>
      
          </form>

  );
}
