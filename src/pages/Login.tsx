import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import LoginForm from '../components/Forms/LoginForm';
import { useAuthStore } from '../stores/useAuthStore';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const location = useLocation() as any;


  const handleLogin = (data: any) => {
    console.log('login Data: ', data);
    // const res = await customFetch<{ token: string; exp: number; user_token?: string; user?: any }>({ ... });
    const userId = "1";
    const fakeUserToken = "user_token_value";
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1h

    login({ userToken: fakeUserToken, expiresAt, user: { id: userId, email: data.email } });

    const to = location.state?.from?.pathname || "/";
    navigate(to, { replace: true });
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
            <LoginForm onSubmit={(data) => handleLogin(data)} />
            <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-sm-1">
              <span>¿Don't have an account?</span>
              <a className="text-decoration-none" href="#">Create an Account</a>
            </div>
          </section>

)};

export default Login;