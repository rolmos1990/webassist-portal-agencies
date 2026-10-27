import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { UIButton } from '../Button';
import InputText from './Inputs/InputText';
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

interface ResendDocumentFormData {
  /** Destinatarios separados por coma */
  emails: string;
  nombre: string;
}

export interface ResendDocumentValues {
  emails: string[];
  nombre: string;
}

// Límite de destinatarios del contrato (enviar-voucher / enviar-cotizacion)
const MAX_EMAILS = 5;

/** "a@x.com, b@y.com" -> ["a@x.com", "b@y.com"] */
const splitEmails = (value: string) =>
  value.split(',').map((e) => e.trim()).filter(Boolean);

// campo de la API -> campo del formulario
const API_FIELD_MAP = { emails: 'emails', nombre: 'nombre' } as const;

interface Props {
  /** Cotización: destinatarios obligatorios. Voucher: si va vacío se envía a los usuales */
  emailsRequired: boolean;
  /** Sólo la cotización recibe el nombre del cliente */
  showName: boolean;
  initialValues?: Partial<ResendDocumentFormData>;
  /** Si rechaza, se marcan los errores por campo del servicio */
  onSubmit: (data: ResendDocumentValues) => Promise<void> | void;
  onCancel: () => void;
}

export default function ResendDocumentForm({ emailsRequired, showName, initialValues, onSubmit, onCancel }: Props) {
  const { t } = useTranslation();
  const emailCheck = yup.string().email();

  const schema = yup.object({
    emails: yup
      .string()
      .defined()
      .test('required', t('resend.emailsRequired'), (v) => !emailsRequired || splitEmails(v).length > 0)
      .test('valid', t('resend.emailsInvalid'), (v) => splitEmails(v).every((e) => emailCheck.isValidSync(e)))
      .test('max', t('resend.emailsMax', { max: MAX_EMAILS }), (v) => splitEmails(v).length <= MAX_EMAILS),
    nombre: yup.string().defined(),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResendDocumentFormData>({
    resolver: yupResolver(schema),
    defaultValues: { emails: '', nombre: '', ...initialValues },
  });

  const handleFormSubmit = async (data: ResendDocumentFormData) => {
    try {
      await onSubmit({ emails: splitEmails(data.emails), nombre: data.nombre.trim() });
    } catch (e) {
      applyApiFieldErrors(e, setError, API_FIELD_MAP, t);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="canvas-body-inner d-flex flex-column h-100"
      noValidate
    >
      <InputText
        label={t('resend.emails')}
        name="emails"
        placeholder={t('resend.emailsPlaceholder')}
        register={register}
        error={errors.emails}
        labelClassName="fw-semibold"
        mainClassName="mb-1"
      />
      <p className="small text-secondary mb-4">
        {emailsRequired ? t('resend.emailsHint', { max: MAX_EMAILS }) : t('resend.emailsHintOptional', { max: MAX_EMAILS })}
      </p>

      {showName && (
        <InputText
          label={t('resend.name')}
          name="nombre"
          placeholder={t('resend.namePlaceholder')}
          register={register}
          error={errors.nombre}
          labelClassName="fw-semibold"
          mainClassName="mb-4"
        />
      )}

      <div className="mt-auto pt-4 border-top d-flex justify-content-end gap-3">
        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-4"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t('common.cancel')}
        </UIButton>

        <UIButton
          type="submit"
          variant="primary"
          pill
          className="px-4"
          disabled={isSubmitting}
        >
          {t('resend.send')}
        </UIButton>
      </div>
    </form>
  );
}
