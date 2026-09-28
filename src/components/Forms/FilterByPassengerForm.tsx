import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { UIButton } from '../Button';
import InputText from './Inputs/InputText';
import InputSelect, { type SelectOption } from './Inputs/InputSelect';
import { EMPTY_PASSENGER_FILTERS, type PassengerFilterValues } from './passengerFilters';

const schema = yup.object({
  voucher: yup.string().trim().default(''),
  nombre: yup.string().trim().default(''),
  pasaporte: yup.string().trim().default(''),
  pais: yup.string().default(''),
  nacionalidad: yup.string().default(''),
});

interface FilterByPassengerFormProps {
  defaultValues?: PassengerFilterValues;
  countryOptions: SelectOption[];
  /** Asistencias filtran por voucher */
  showVoucher?: boolean;
  /** Cotizaciones filtran por país de salida/destino */
  showCountry?: boolean;
  onSubmit: (values: PassengerFilterValues) => void;
  onCancel: () => void;
}

const FilterByPassengerForm: React.FC<FilterByPassengerFormProps> = ({
  defaultValues = EMPTY_PASSENGER_FILTERS,
  countryOptions,
  showVoucher = false,
  showCountry = false,
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PassengerFilterValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // El Offcanvas nunca desmonta este formulario: al reabrir debe mostrar el filtro activo
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

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

      <InputSelect
        name="nacionalidad"
        label={t('filters.nationality')}
        options={countryOptions}
        register={register}
        emptyOptionLabel={t('filters.all')}
        mainClassName="mb-3"
        error={errors.nacionalidad}
      />

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
