import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UIButton } from '../Button';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import { EMPTY_DASHBOARD_FILTERS, type DashboardFilterValues } from './dashboardFilters';

interface Props {
  defaultValues: DashboardFilterValues;
  countryOptions: SelectOption[];
  planTypeOptions: SelectOption[];
  onSubmit: (values: DashboardFilterValues) => void;
  onCancel: () => void;
}

export default function FilterDashboardForm({ defaultValues, countryOptions, planTypeOptions, onSubmit, onCancel }: Props) {
  const { t } = useTranslation();
  // Sólo selects con opciones del servicio: no hace falta schema de validación
  const { register, handleSubmit, reset } = useForm<DashboardFilterValues>({ defaultValues });

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
      <p className="small text-secondary mb-4">{t('dashboard.filters.hint')}</p>

      <InputSelect
        name="paisOrigen"
        label={t('dashboard.filters.originCountry')}
        options={countryOptions}
        register={register}
        emptyOptionLabel={t('filters.all')}
        mainClassName="mb-3"
      />

      <InputSelect
        name="tipoPlan"
        label={t('dashboard.filters.planType')}
        options={planTypeOptions}
        register={register}
        emptyOptionLabel={t('filters.all')}
        mainClassName="mb-3"
      />

      <div className="mt-auto pt-4 d-flex justify-content-end gap-3">
        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-4"
          onClick={() => onSubmit(EMPTY_DASHBOARD_FILTERS)}
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
          {t('dashboard.filters.apply')}
        </UIButton>
      </div>
    </form>
  );
}
