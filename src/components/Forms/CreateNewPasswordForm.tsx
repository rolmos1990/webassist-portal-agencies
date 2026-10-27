import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { UIButton } from "../Button";
import InputText from "./Inputs/InputText";
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface CreateNewPasswordFormData {
    password: string;
    confirmPassword: string;
  }

interface Props {
    /** Si rechaza, se marcan los errores por campo del servicio */
    onSubmit: (data: CreateNewPasswordFormData) => Promise<void> | void;
  }

const PASSWORD_MIN_LENGTH = 8;

// campo de la API -> campo del formulario
const API_FIELD_MAP = { password: 'password' } as const;

const CreateNewPasswordForm: React.FC<Props> = ({ onSubmit }) => {
    const { t } = useTranslation();

    const schema = yup.object({
      password: yup
        .string()
        .required(t('passwordReset.passwordRequired'))
        .min(PASSWORD_MIN_LENGTH, t('passwordReset.passwordMin', { min: PASSWORD_MIN_LENGTH })),
      confirmPassword: yup
        .string()
        .required(t('passwordReset.confirmRequired'))
        .oneOf([yup.ref('password')], t('passwordReset.passwordMismatch')),
    });

    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = useForm<CreateNewPasswordFormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        password: '',
        confirmPassword: '',
      },
    });

    const handleFormSubmit = async (data: CreateNewPasswordFormData) => {
      try {
        await onSubmit(data);
      } catch (e) {
        applyApiFieldErrors(e, setError, API_FIELD_MAP, t);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="py-3"
        noValidate
      >
            <InputText
            type="password"
            label={t('passwordReset.newPassword')}
            name="password"
            placeholder={t('passwordReset.passwordPlaceholder')}
            register={register}
            error={errors.password}
            labelClassName="fw-semibold"
            mainClassName="mb-3"
            />

            <InputText
            type="password"
            label={t('passwordReset.confirmPassword')}
            name="confirmPassword"
            placeholder={t('passwordReset.passwordPlaceholder')}
            register={register}
            error={errors.confirmPassword}
            labelClassName="fw-semibold"
            mainClassName="mb-3"
            />

         <UIButton
          type="submit"
          variant="primary"
          pill={false}
          size="lg"
          className="d-inline-block w-100"
          disabled={isSubmitting}
        >
          {t('passwordReset.confirmButton')}
        </UIButton>

      </form>
    );
  };

  export default CreateNewPasswordForm;
