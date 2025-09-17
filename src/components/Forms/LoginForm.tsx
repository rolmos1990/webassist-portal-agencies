import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UIButton } from "../Button";
import InputText from "./Inputs/InputText";
import { useNavigate } from 'react-router-dom';

export interface CreateAgencyFormData {
    email: string;
    password: string;
  }

interface Props {
    onSubmit: (data: CreateAgencyFormData) => void;
  }

  const schema = yup.object({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required'),
  });


const LoginForm: React.FC<Props> = ({ onSubmit }) => {
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
        <InputText
          name="userEmail"
          label="Email"
          placeholder="Your email address"
          register={register}
          mainClassName="mb-3"
          error={errors.email}
        />

        <InputText
          name="userPassword"
          label="Password"
          placeholder="Your password"
          register={register}
          mainClassName="mb-3"
          error={errors.password}
        />
        <div className="d-flex justify-content-end mb-3">
        <UIButton
          variant="link"
          onClick={() => navigate('/forgot-password')}
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
          disabled={isSubmitting}
        >
          Login
        </UIButton>
      </form>
    );
  };
  
  export default LoginForm;