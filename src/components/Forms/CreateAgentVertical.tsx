import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputText from '../Forms/Inputs/InputText';
import InputEmail from '../Forms/Inputs/InputEmail';
import RadioGroup from '../Forms/Inputs/RadioGroup';
import { UIButton } from '../Button';
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface CreateAgentFormData {
  firstName: string;
  lastName: string;
  email: string;
  /** Porcentaje; vacío = el servicio asume 0 */
  commission: string;
  role: 'regular' | 'admin';
}

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
});

// campo de la API -> campo del formulario
const API_FIELD_MAP = {
  nombre: 'firstName',
  apellido: 'lastName',
  email: 'email',
  comision: 'commission',
  rol: 'role',
} as const;

interface Props {
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
};

export default function CreateAgentVertical({ initialValues, onSubmit, onCancel }: Props) {
  const { t } = useTranslation();
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
        label="First Name"
        placeholder="Eg. Ana"
        register={register}
        mainClassName="mb-3"
        error={errors.firstName}
      />

      <InputText
        name="lastName"
        label="Last Name"
        placeholder="Eg. Torres"
        register={register}
        mainClassName="mb-3"
        error={errors.lastName}
      />

      <InputEmail
        name="email"
        label="Email"
        placeholder="Eg. ana@mail.com"
        register={register}
        mainClassName="mb-3"
        error={errors.email}
      />

      <InputText
        name="commission"
        label="Commission"
        placeholder="Eg. 10"
        register={register}
        mainClassName="mb-3"
        error={errors.commission}
      />

      <RadioGroup
        name="role"
        label="Role"
        options={[
          { value: 'regular', label: 'Regular Agent' },
          { value: 'admin', label: 'Admin' },
        ]}
        register={register}
        mainClassName="mb-4"
        error={errors.role}
      />

      <div className="mt-auto pt-4 border-top d-flex justify-content-end gap-3">
        <UIButton
          type="button"
          variant="link"
          pill
          className="text-secondary text-decoration-none px-4"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </UIButton>

        <UIButton
          type="submit"
          variant="primary"
          pill
          className="px-4"
          disabled={isSubmitting}
        >
          Guardar
        </UIButton>
      </div>
    </form>
  );
}
