import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UIButton } from "../Button";
import InputText from "./Inputs/InputText";
import { useNavigate } from 'react-router-dom';
import InputEmail from './Inputs/InputEmail';
import { PATHS } from '../../routes/Routes';

export interface CreateAgencyFormData {
    email: string;
    password: string;
  }

interface Props {
    onSubmit: (data: CreateAgencyFormData) => void;
    isLoading?: boolean;
  }

  const schema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required'),
  });


const LoginForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<CreateAgencyFormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        email: '',
        password: ''
      },
    });
    const navigate = useNavigate();
  
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
        <InputEmail
          name="email"
          label="Email"
          placeholder="Your email address"
          register={register}
          mainClassName="mb-3"
          error={errors.email}
        />

        <InputText
          type="password"
          name="password"
          label="Password"
          placeholder="Your password"
          register={register}
          mainClassName="mb-3"
          error={errors.password}
        />
        <div className="d-flex justify-content-end mb-3">
        <UIButton
          variant="link"
          onClick={() => navigate(PATHS.auth.forgotPassword())}
          title="Go to: Support"
          >
          Forgot Password?
          </UIButton>
        </div>
        <UIButton
          type="submit"
          variant="primary"
          pill={false}
          size="lg"
          className="d-inline-block w-100"
          disabled={isSubmitting || isLoading}
        >
          Login {isLoading && <div className="spinner-border spinner-border-sm ms-2 text-white" role="status" aria-hidden="true" />}
        </UIButton>
      </form>
    );
  };
  
  export default LoginForm;