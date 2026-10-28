import { useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { UIButton } from '../Button';
import InputText from './Inputs/InputText';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import { EMPTY_PASSENGER_FILTERS, type PassengerFilterValues } from './passengerFilters';

interface FilterByPassengerFormProps {
  defaultValues?: PassengerFilterValues;
  countryOptions: SelectOption[];
  /** Asistencias filtran por voucher */
  showVoucher?: boolean;
  /** Cotizaciones filtran por país de salida/destino */
  showCountry?: boolean;
  /** Por ahora sólo cotizaciones filtran por nacionalidad */
  showNationality?: boolean;
  /** Asistencias: rango de fechas de compra, tipo de plan y plan */
  showPlanAndDates?: boolean;
  planTypeOptions?: SelectOption[];
  /** Opciones de plan según el tipo de plan elegido ('' = todos) */
  getPlanOptions?: (tipoPlan: string) => SelectOption[];
  onSubmit: (values: PassengerFilterValues) => void;
  onCancel: () => void;
}

const FilterByPassengerForm: React.FC<FilterByPassengerFormProps> = ({
  defaultValues = EMPTY_PASSENGER_FILTERS,
  countryOptions,
  showVoucher = false,
  showCountry = false,
  showNationality = true,
  showPlanAndDates = false,
  planTypeOptions = [],
  getPlanOptions,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();

  // YYYY-MM-DD se compara bien como texto
  const schema = useMemo(() => yup.object({
    voucher: yup.string().trim().default(''),
    nombre: yup.string().trim().default(''),
    pasaporte: yup.string().trim().default(''),
    pais: yup.string().default(''),
    nacionalidad: yup.string().default(''),
    fechaInicio: yup.string().default(''),
    fechaFinal: yup
      .string()
      .default('')
      .test('range', t('filters.invalidRange'), function (value) {
        const { fechaInicio } = this.parent as PassengerFilterValues;
        return !value || !fechaInicio || value >= fechaInicio;
      }),
    tipoPlan: yup.string().default(''),
    plan: yup.string().default(''),
  }), [t]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PassengerFilterValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // El Offcanvas nunca desmonta este formulario: al reabrir debe mostrar el filtro activo
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const tipoPlan = watch('tipoPlan');
  const planOptions = useMemo(() => getPlanOptions?.(tipoPlan) ?? [], [getPlanOptions, tipoPlan]);

  // Si cambia el tipo de plan y el plan elegido ya no pertenece a él, se limpia
  useEffect(() => {
    const plan = getValues('plan');
    if (plan && planOptions.length > 0 && !planOptions.some((o) => String(o.value) === plan)) {
      setValue('plan', '');
    }
  }, [planOptions, getValues, setValue]);

  const handleFormSubmit: SubmitHandler<PassengerFilterValues> = (data) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    reset(defaultValues);
    onCancel();
  };

  const handleClear = () => {
    reset(EMPTY_PASSENGER_FILTERS);
    onSubmit(EMPTY_PASSENGER_FILTERS);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="py-3" noValidate>
      {showPlanAndDates && (
        <>
          <label htmlFor="fechaInicio" className="form-label">{t('filters.dateFrom')}</label>
          <input
            id="fechaInicio"
            type="date"
            className={`form-control rounded-pill mb-3 ${errors.fechaInicio ? 'is-invalid' : ''}`}
            {...register('fechaInicio')}
          />

          <label htmlFor="fechaFinal" className="form-label">{t('filters.dateTo')}</label>
          <input
            id="fechaFinal"
            type="date"
            className={`form-control rounded-pill ${errors.fechaFinal ? 'is-invalid' : 'mb-3'}`}
            {...register('fechaFinal')}
          />
          {errors.fechaFinal && <div className="invalid-feedback d-block mb-3">{errors.fechaFinal.message}</div>}
        </>
      )}

      {showVoucher && (
        <InputText
          name="voucher"
          label={t('filters.voucher')}
          placeholder="A93-XXXXXX"
          register={register}
          mainClassName="mb-3"
          error={errors.voucher}
        />
      )}

      {showPlanAndDates && (
        <>
          <InputSelect
            name="tipoPlan"
            label={t('filters.planType')}
            options={planTypeOptions}
            register={register}
            emptyOptionLabel={t('filters.all')}
            mainClassName="mb-3"
            error={errors.tipoPlan}
          />

          <InputSelect
            name="plan"
            label={t('filters.plan')}
            options={planOptions}
            register={register}
            emptyOptionLabel={t('filters.all')}
            mainClassName="mb-3"
            error={errors.plan}
          />
        </>
      )}

      <InputText
        name="nombre"
        label={t('filters.name')}
        register={register}
        mainClassName="mb-3"
        error={errors.nombre}
      />

      <InputText
        name="pasaporte"
        label={t('filters.passport')}
        register={register}
        mainClassName="mb-3"
        error={errors.pasaporte}
      />

      {showCountry && (
        <InputSelect
          name="pais"
          label={t('filters.country')}
          options={countryOptions}
          register={register}
          emptyOptionLabel={t('filters.all')}
          mainClassName="mb-3"
          error={errors.pais}
        />
      )}

      {showNationality && (
        <InputSelect
          name="nacionalidad"
          label={t('filters.nationality')}
          options={countryOptions}
          register={register}
          emptyOptionLabel={t('filters.all')}
          mainClassName="mb-3"
          error={errors.nacionalidad}
        />
      )}

      <div className="mt-auto pt-4 d-flex justify-content-end gap-3">
        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-3"
          onClick={handleClear}
          disabled={isSubmitting}
        >
          {t('filters.clear')}
        </UIButton>

        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-3"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          {t('salesReport.cancelFilter')}
        </UIButton>

        <UIButton
          type="submit"
          variant="primary"
          pill
          className="px-4"
          disabled={isSubmitting}
        >
          {t('salesReport.applyFilter')}
        </UIButton>
      </div>
    </form>
  );
};

export default FilterByPassengerForm;
