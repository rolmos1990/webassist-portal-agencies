import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('token', '123'); // token simulado
    navigate('/');
  };

  return (
<div className="d-flex justify-content-center align-items-center min-vh-100 px-3">
  <div className="login-card">
    <div className="text-center">
      <img src={logo} className="logo" />
    </div>
    <h1 className="welcome-title">Welcome Back! 👋</h1>
    <p className="welcome-subtitle">Please enter your login details</p>
    <form>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" placeholder="Your mail address" required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" placeholder="Your password" required />
      </div>
      <a href="#" className="forgot-password">Forgot Password?</a>
      <button type="submit" className="btn login-btn" onClick={handleLogin}>Login</button>
    </form>
    <div className="signup-text">
      Don't have an account?
      <a href="#" className="signup-link">Create an Account</a>
    </div>
  </div>
</div>
)};

export default Login;