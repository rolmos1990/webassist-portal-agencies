import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputText from '../Forms/Inputs/InputText';
import InputEmail from '../Forms/Inputs/InputEmail';
import InputSelect from '../Forms/Inputs/InputSelect';
import InputSwitch from '../Forms/Inputs/InputSwitch';
import RadioGroup from '../Forms/Inputs/RadioGroup';
import { UIButton } from '../Button';
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';
import { useGetIdiomas } from '../../api/generated';

export interface CreateAgentFormData {
  firstName: string;
  lastName: string;
  email: string;
  /** Porcentaje; vacío = el servicio asume 0 */
  commission: string;
  role: 'regular' | 'admin';
  // Sólo se editan en modo 'edit'; en creación quedan con sus valores por defecto y no se envían
  phone: string;
  whatsapp: string;
  /** Código de idioma (GET /idiomas); vacío = sin cambio */
  language: string;
  alternateEmail: string;
  receiveRenewals: boolean;
  active: boolean;
}

const PHONE_REGEX = /^\+?[0-9\s-]*$/;

const schema = yup.object({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  commission: yup
    .string()
    .trim()
    .defined()
    .matches(/^(\d+(\.\d+)?)?$/, 'Invalid commission'),
  role: yup.mixed<'regular' | 'admin'>().oneOf(['regular', 'admin']).required('Role is required'),
  phone: yup.string().trim().defined().matches(PHONE_REGEX, 'Invalid phone'),
  whatsapp: yup.string().trim().defined().matches(PHONE_REGEX, 'Invalid phone'),
  language: yup.string().defined(),
  alternateEmail: yup.string().trim().email('Invalid email').defined(),
  receiveRenewals: yup.boolean().required(),
  active: yup.boolean().required(),
});

// campo de la API -> campo del formulario
const API_FIELD_MAP = {
  nombre: 'firstName',
  apellido: 'lastName',
  email: 'email',
  comision: 'commission',
  rol: 'role',
  telefono: 'phone',
  whatsapp: 'whatsapp',
  idioma: 'language',
  correo_renovaciones_alternativo: 'alternateEmail',
  recibir_correos_renovaciones: 'receiveRenewals',
  status: 'active',
} as const;

interface Props {
  mode?: 'create' | 'edit';
  initialValues?: Partial<CreateAgentFormData>;
  /** Si rechaza, el formulario se mantiene y muestra los errores por campo del servicio */
  onSubmit: (data: CreateAgentFormData) => Promise<void> | void;
  onCancel: () => void;
}

const DEFAULT_VALUES: CreateAgentFormData = {
  firstName: '',
  lastName: '',
  email: '',
  commission: '',
  role: 'regular',
  phone: '',
  whatsapp: '',
  language: '',
  alternateEmail: '',
  receiveRenewals: false,
  active: true,
};

export default function CreateAgentVertical({ mode = 'create', initialValues, onSubmit, onCancel }: Props) {
  const { t } = useTranslation();
  const isEdit = mode === 'edit';
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateAgentFormData>({
    resolver: yupResolver(schema),
    defaultValues: { ...DEFAULT_VALUES, ...initialValues },
  });

  const { data: idiomas } = useGetIdiomas({ query: { enabled: isEdit, staleTime: Infinity } });
  const languageOptions = useMemo(
    () => Object.entries(idiomas?.data ?? {}).map(([value, label]) => ({ value, label })),
    [idiomas]
  );

  const handleFormSubmit = async (data: CreateAgentFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (e) {
      applyApiFieldErrors(e, setError, API_FIELD_MAP, t);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="create-agent-form canvas-body-inner d-flex flex-column h-100"
      noValidate
    >
      <InputText
        name="firstName"
        label={t('agents.form.firstName')}
        placeholder="Eg. Ana"
        register={register}
        mainClassName="mb-3"
        error={errors.firstName}
      />

      <InputText
        name="lastName"
        label={t('agents.form.lastName')}
        placeholder="Eg. Torres"
        register={register}
        mainClassName="mb-3"
        error={errors.lastName}
      />

      <InputEmail
        name="email"
        label={t('agents.form.email')}
        placeholder="Eg. ana@mail.com"
        register={register}
        mainClassName="mb-3"
        error={errors.email}
      />

      {isEdit && (
        <>
          <InputText
            name="phone"
            type="tel"
            label={t('agents.form.phone')}
            placeholder="+50767891234"
            register={register}
            mainClassName="mb-3"
            error={errors.phone}
          />

          <InputText
            name="whatsapp"
            type="tel"
            label={t('agents.form.whatsapp')}
            placeholder="+50767891234"
            register={register}
            mainClassName="mb-3"
            error={errors.whatsapp}
          />

          <InputSelect
            name="language"
            label={t('agents.form.language')}
            options={languageOptions}
            register={register}
            emptyOptionLabel={t('agents.form.selectLanguage')}
            mainClassName="mb-3"
            error={errors.language}
          />

          <InputText
            name="alternateEmail"
            type="email"
            label={t('agents.form.alternateEmail')}
            placeholder="email@company.com"
            register={register}
            mainClassName="mb-3"
            error={errors.alternateEmail}
          />

          <InputSwitch
            name="receiveRenewals"
            label={t('agents.form.receiveRenewals')}
            register={register}
            error={errors.receiveRenewals}
          />
        </>
      )}

      <InputText
        name="commission"
        label={t('agents.form.commission')}
        placeholder="Eg. 10"
        register={register}
        mainClassName="mb-3"
        error={errors.commission}
      />

      <RadioGroup
        name="role"
        label={t('agents.form.role')}
        options={[
          { value: 'regular', label: t('agents.roleAgent') },
          { value: 'admin', label: t('agents.roleAgentAdmin') },
        ]}
        register={register}
        mainClassName="mb-4"
        error={errors.role}
      />

      {isEdit && (
        <InputSwitch
          name="active"
          label={t('agents.form.active')}
          register={register}
          error={errors.active}
        />
      )}

      <div className="mt-auto pt-4 border-top d-flex justify-content-end gap-3">
        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-4"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          {t('agents.form.cancel')}
        </UIButton>

        <UIButton
          type="submit"
          variant="primary"
          pill
          className="px-4"
          disabled={isSubmitting}
        >
          {t('agents.form.save')}
        </UIButton>
      </div>
    </form>
  );
}
