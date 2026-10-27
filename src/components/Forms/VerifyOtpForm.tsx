import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { UIButton } from "../Button";
import InputText from "./Inputs/InputText";
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface VerifyOtpFormData {
    otp: string;
  }

interface Props {
    /** Si rechaza, se marcan los errores por campo del servicio */
    onSubmit: (data: VerifyOtpFormData) => Promise<void> | void;
    onResend: () => Promise<void> | void;
  }

// campo de la API -> campo del formulario
const API_FIELD_MAP = { otp: 'otp' } as const;

const VerifyOtpForm: React.FC<Props> = ({ onSubmit, onResend }) => {
    const { t } = useTranslation();
    const [resending, setResending] = useState(false);

    // Mismo patrón que el contrato: 6 dígitos
    const schema = yup.object({
      otp: yup.string().required(t('passwordReset.otpRequired')).matches(/^[0-9]{6}$/, t('passwordReset.otpInvalid')),
    });

    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = useForm<VerifyOtpFormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        otp: ''
      },
    });

    const handleFormSubmit = async (data: VerifyOtpFormData) => {
      try {
        await onSubmit(data);
      } catch (e) {
        applyApiFieldErrors(e, setError, API_FIELD_MAP, t);
      }
    };

    const handleResend = async () => {
      setResending(true);
      try {
        await onResend();
      } finally {
        setResending(false);
      }
    };

    return (
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="py-3"
        noValidate
      >
            <InputText
            label={t('passwordReset.otp')}
            name="otp"
            placeholder="000000"
            register={register}
            error={errors.otp}
            labelClassName="fw-semibold"
            mainClassName="mb-3"
            />

        <div className="d-flex justify-content-end mb-3">
        <UIButton
          variant="link"
          onClick={handleResend}
          disabled={resending || isSubmitting}
          >
          {t('passwordReset.resendCode')}
          </UIButton>
        </div>

         <UIButton
          type="submit"
          variant="primary"
          pill={false}
          size="lg"
          className="d-inline-block w-100"
          disabled={isSubmitting}
        >
          {t('passwordReset.verifyCode')}
        </UIButton>

      </form>
    );
  };

  export default VerifyOtpForm;
