import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputText from '../Forms/Inputs/InputText';
import InputEmail from '../Forms/Inputs/InputEmail';
import RadioGroup from '../Forms/Inputs/RadioGroup';
import { UIButton } from '../Button';

interface CreateAgentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  commission: string;
  role: 'regular' | 'admin';
}

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  location: yup.string().required('Location is required'),
  commission: yup.string().required('Commission is required'),
  role: yup.mixed<'regular' | 'admin'>().oneOf(['regular', 'admin']).required('Role is required'),
});

interface Props {
  onSubmit: (data: CreateAgentFormData) => void;
  onCancel: () => void;
}

export default function CreateAgentForm({ onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAgentFormData>({
    resolver: yupResolver(schema),
    defaultValues: { role: 'regular' },
  });

  const handleFormSubmit = (data: CreateAgentFormData) => {
    onSubmit(data);
    reset();
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
        name="phone"
        label="Phone"
        placeholder="+50766712785"
        register={register}
        mainClassName="mb-3"
        error={errors.phone}
      />

      <InputText
        name="location"
        label="Location"
        placeholder="Eg. La Palma, Panama"
        register={register}
        mainClassName="mb-3"
        error={errors.location}
      />

      <InputText
        name="commission"
        label="Commission"
        placeholder="Eg. 10%"
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
