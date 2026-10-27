import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { UIButton } from '../Button';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import { EMPTY_RENEWAL_FILTERS, type RenewalFilterValues } from './renewalFilters';

interface Props {
  defaultValues: RenewalFilterValues;
  planTypeOptions: SelectOption[];
  onSubmit: (values: RenewalFilterValues) => void;
  onCancel: () => void;
}

export default function FilterRenewalsForm({ defaultValues, planTypeOptions, onSubmit, onCancel }: Props) {
  const { t } = useTranslation();

  // YYYY-MM-DD se compara bien como texto
  const schema = yup.object({
    tipoPlan: yup.string().default(''),
    fechaInicio: yup.string().default(''),
    fechaFinal: yup
      .string()
      .default('')
      .test('range', t('renewals.filters.invalidRange'), function (value) {
        const { fechaInicio } = this.parent as RenewalFilterValues;
        return !value || !fechaInicio || value >= fechaInicio;
      }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RenewalFilterValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // El Offcanvas no desmonta el formulario: al reabrir debe mostrar el filtro activo
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleCancel = () => {
    reset(defaultValues);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="canvas-body-inner d-flex flex-column h-100" noValidate>
      <InputSelect
        name="tipoPlan"
        label={t('renewals.filters.planType')}
        options={planTypeOptions}
        register={register}
        emptyOptionLabel={t('filters.all')}
        mainClassName="mb-3"
        error={errors.tipoPlan}
      />

      <label htmlFor="fechaInicio" className="form-label">{t('renewals.filters.from')}</label>
      <input
        id="fechaInicio"
        type="date"
        className={`form-control rounded-pill mb-3 ${errors.fechaInicio ? 'is-invalid' : ''}`}
        {...register('fechaInicio')}
      />

      <label htmlFor="fechaFinal" className="form-label">{t('renewals.filters.to')}</label>
      <input
        id="fechaFinal"
        type="date"
        className={`form-control rounded-pill ${errors.fechaFinal ? 'is-invalid' : ''}`}
        {...register('fechaFinal')}
      />
      {errors.fechaFinal && <div className="invalid-feedback d-block">{errors.fechaFinal.message}</div>}

      <div className="mt-auto pt-4 d-flex justify-content-end gap-3">
        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-4"
          onClick={() => onSubmit(EMPTY_RENEWAL_FILTERS)}
        >
          {t('filters.clear')}
        </UIButton>
        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-4"
          onClick={handleCancel}
        >
          {t('common.cancel')}
        </UIButton>
        <UIButton type="submit" variant="primary" pill className="px-4">
          {t('renewals.filters.apply')}
        </UIButton>
      </div>
    </form>
  );
}
