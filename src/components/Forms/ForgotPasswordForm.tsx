import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UIButton } from "../Button";
import InputText from "./Inputs/InputText";

export interface CreateAgencyFormData {
    email: string;
  }

interface Props {
    onSubmit: (data: CreateAgencyFormData) => void;
  }

  const schema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email'),
  });


const ForgotPasswordForm: React.FC<Props> = ({ onSubmit }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<CreateAgencyFormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        email: ''
      },
    });
  
    const handleFormSubmit = (data: CreateAgencyFormData) => {
      onSubmit(data);
      reset();
    };

    return (
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="py-3"
        noValidate
      >
            <InputText
            label="Email"
            name="email"
            placeholder="Your mail address"
            register={register}
            error={errors.email}
            icon="bi bi-search"
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
          Send the password reset link
        </UIButton>

      </form>
    );
  };
  
  export default ForgotPasswordForm;