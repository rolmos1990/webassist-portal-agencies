import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputText from '../Forms/Inputs/InputText';
import InputEmail from '../Forms/Inputs/InputEmail';
import InputSelect from '../Forms/Inputs/InputSelect';
import { UIButton } from '../Button';

interface CreateClientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
}

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
});

interface Props {
  onSubmit: (data: CreateClientFormData) => void;
  onCancel: () => void;
}

export default function CreateClientVertical({ onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateClientFormData>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: CreateClientFormData) => {
    onSubmit(data);
    reset();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  // City options - replace with your actual city data
  const cities = [
    { value: 'panama', label: 'Panamá' },
    { value: 'panama-city', label: 'Ciudad de Panamá' },
    { value: 'david', label: 'David' },
    { value: 'colon', label: 'Colón' },
    { value: 'chorrera', label: 'La Chorrera' },
  ];

  // Country options - replace with your actual country data
  const countries = [
    { value: 'pa', label: 'Panamá' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'México' },
    { value: 'co', label: 'Colombia' },
  ];

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="create-client-form canvas-body-inner d-flex flex-column h-100"
      noValidate
    >
      <InputText
        name="firstName"
        label="First Name"
        placeholder="Eg. John"
        register={register}
        mainClassName="mb-3"
        error={errors.firstName}
      />

      <InputText
        name="lastName"
        label="Last Name"
        placeholder="Eg. Doe"
        register={register}
        mainClassName="mb-3"
        error={errors.lastName}
      />

      <InputEmail
        name="email"
        label="Email"
        placeholder="Eg. john@example.com"
        register={register}
        mainClassName="mb-3"
        error={errors.email}
      />

      <InputText
        name="phone"
        label="Phone"
        placeholder="+1 (555) 123-4567"
        register={register}
        mainClassName="mb-3"
        error={errors.phone}
      />

      <InputSelect
        name="city"
        label="City"
        options={cities}
        register={register}
        error={errors.city}
        mainClassName="mb-3"
        emptyOptionLabel="Select a city"
      />

      <InputSelect
        name="country"
        label="Country"
        options={countries}
        register={register}
        error={errors.country}
        mainClassName="mb-4"
        emptyOptionLabel="Select a country"
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
          Cancel
        </UIButton>

        <UIButton
          type="submit"
          variant="primary"
          pill
          className="px-4"
          disabled={isSubmitting}
        >
          Create Client
        </UIButton>
      </div>
    </form>
  );
}