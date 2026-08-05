import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { UIButton } from '../Button';

type FormValues = {
  month: string; // "YYYY-MM" (formato nativo de <input type="month">) o "" sin filtro
};

const schema = yup.object({
  month: yup.string().default(''),
});

interface FilterByDateFormProps {
  defaultValue?: string; // "YYYY-MM"
  onSubmit: (month: string) => void;
  onCancel: () => void;
}

const FilterByDateForm: React.FC<FilterByDateFormProps> = ({ defaultValue = '', onSubmit, onCancel = () => {} }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { month: defaultValue },
  });

  // El Offcanvas nunca desmonta este formulario, así que sin esto reset() (Cancelar)
  // volvería siempre al defaultValue capturado en el primer montaje en vez del filtro
  // activo actual cada vez que se reabre tras aplicar un filtro distinto.
  useEffect(() => {
    reset({ month: defaultValue });
  }, [defaultValue, reset]);

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data.month);
  };

  const handleCancel = () => {
    reset({ month: defaultValue });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="py-3" noValidate>
      <label htmlFor="month" className="form-label">
        {t('salesReport.filterByDateLabel')}
      </label>
      <input
        id="month"
        type="month"
        className={`form-control rounded-pill ${errors.month ? 'is-invalid' : ''}`}
        {...register('month')}
      />

      <div className="mt-auto pt-4 d-flex justify-content-end gap-3">
        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-4"
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

export default FilterByDateForm;
