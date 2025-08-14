import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import useAuth from '../hooks/useAuth';


const Login = () => {
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
              <h1 className="fw-bold fs-3">Welcome Back!👋</h1>
              <p className="text-secondary">¡Please enter your login details!</p>
            </div>
            <form className="py-3">
              <div className="mb-3">
                <label htmlFor="userEmail" className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control rounded-pill" id="userEmail" aria-describedby="emailHelp" placeholder="Your email address" required />
              </div>
              <div className="mb-3">
                <label htmlFor="userPassword" className="form-label fw-semibold">Password</label>
                <input type="password" className="form-control rounded-pill" id="userPassword" placeholder="Your password" required />
              </div>
              <div className="d-flex justify-content-end mb-3">
                <a className="text-decoration-none" href="#" title="Go to: Support">Forgot Password?</a>
              </div>
              <div>
                <button className="d-inline-block w-100 bg-primary border-0 py-2" type="submit" onClick={handleLogin}>Login</button>
              </div>
            </form>
            <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-sm-1">
              <span>¿Don't have an account?</span>
              <a className="text-decoration-none" href="#">Create an Account</a>
            </div>
          </section>

)};

export default Login;