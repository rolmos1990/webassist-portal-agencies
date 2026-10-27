import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { UIButton } from "../Button";
import InputText from "./Inputs/InputText";
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface ForgotPasswordFormData {
    email: string;
  }

interface Props {
    initialEmail?: string;
    /** Si rechaza, se marcan los errores por campo del servicio */
    onSubmit: (data: ForgotPasswordFormData) => Promise<void> | void;
  }

// campo de la API -> campo del formulario
const API_FIELD_MAP = { email: 'email' } as const;

const ForgotPasswordForm: React.FC<Props> = ({ initialEmail = '', onSubmit }) => {
    const { t } = useTranslation();

    const schema = yup.object({
      email: yup.string().required(t('passwordReset.emailRequired')).email(t('passwordReset.emailInvalid')),
    });

    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        email: initialEmail
      },
    });

    const handleFormSubmit = async (data: ForgotPasswordFormData) => {
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
            type="email"
            label={t('passwordReset.email')}
            name="email"
            placeholder={t('passwordReset.emailPlaceholder')}
            register={register}
            error={errors.email}
            icon="bi bi-envelope"
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
          {t('passwordReset.sendCode')}
        </UIButton>

      </form>
    );
  };

  export default ForgotPasswordForm;
