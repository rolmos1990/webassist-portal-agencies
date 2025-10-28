import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import { UIButton } from '../components/Button';
import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';
import { PATHS } from '../routes/Routes';


const ForgotPassword = () => {
  const navigate = useNavigate();


  return (
            <section className="container bg-white border rounded-4 p-5 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="mb-4">
              <img src={logo} alt="We Assist logo" />
            </div>
            <div className="d-flex flex-column">
              <h1 className="fw-bold fs-3">Forgot Password?</h1>
              <p className="text-secondary">No worries, we´ll send the link to reset</p>
            </div>
            <ForgotPasswordForm onSubmit={(data) => console.log(data)} />
            <div className="d-flex flex-column flex-sm-row 
                align-items-center align-items-sm-start 
                justify-content-center
                gap-sm-1">
            <UIButton
                variant="whiteLink"
                icon="bi bi-arrow-left"
                iconPosition="left"
                onClick={() => navigate(PATHS.auth.login())}
            >
                Back to log in
            </UIButton>
            </div>

          </section>

)};

export default ForgotPassword;