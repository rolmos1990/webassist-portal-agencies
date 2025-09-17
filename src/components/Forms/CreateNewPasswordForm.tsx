import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { UIButton } from "../Button";
import InputText from "./Inputs/InputText";
import { useNavigate } from 'react-router-dom';

export interface FormData {
    password: string;
    newPassword: string;
  }

interface Props {
    onSubmit: (data: FormData) => void;
  }

  const schema = yup.object({
    password: yup.string().required('Password is required'),
    newPassword: yup.string().required('New password is required'),
      });


const CreateNewPasswordForm: React.FC<Props> = ({ onSubmit }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
        password: '',
        newPassword: '',
      },
    });
    const navigate = useNavigate();
  
    const handleFormSubmit = (data: FormData) => {
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
            type="password"
            label="New password"
            name="password"
            placeholder="Your password"
            register={register}
            error={errors.password}
            labelClassName="fw-semibold"
            mainClassName="mb-3"
            />

            <InputText
            type="password"
            label="Confirm password"
            name="newPassword"
            placeholder="Your password"
            register={register}
            error={errors.newPassword}
            labelClassName="fw-semibold"
            mainClassName="mb-3"
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
          Confirm password
        </UIButton>

      </form>
    );
  };
  
  export default CreateNewPasswordForm;