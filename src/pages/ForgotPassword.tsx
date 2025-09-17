import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import useAuth from '../hooks/useAuth';
import { UIButton } from '../components/Button';


const ForgotPassword = () => {
  useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('token', '123'); // token simulado
    navigate('/');
  };

  return (
            <section className="container bg-white border rounded-4 p-5 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="mb-4">
              <img src={logo} alt="We Assist logo" />
            </div>
            <div className="d-flex flex-column">
              <h1 className="fw-bold fs-3">Forgot Password?</h1>
              <p className="text-secondary">No worries, we´ll send the link to reset</p>
            </div>
            <form className="py-3" onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="userEmail" className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control rounded-pill" id="userEmail" aria-describedby="emailHelp" placeholder="Your email address" required />
              </div>
              <UIButton
              pill={false}
                type="submit"
                variant="squareDark"
                onClick={handleLogin}
                size='lg'
                className="d-inline-block w-100"
            >
                Send the password reset link
            </UIButton>
            </form>
            <div className="d-flex flex-column flex-sm-row 
                align-items-center align-items-sm-start 
                justify-content-center
                gap-sm-1">
            <UIButton
                variant="whiteLink"
                icon="bi bi-arrow-left"
                iconPosition="left"
                onClick={() => navigate('/login')}
            >
                Back to log in
            </UIButton>
            </div>

          </section>

)};

export default ForgotPassword;