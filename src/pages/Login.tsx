import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import LoginForm from '../components/Forms/LoginForm';
import { useAuthStore } from '../stores/useAuthStore';
import { useLocation } from 'react-router-dom';
import { usePostIdiomaLogin } from '../api/generated';


const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const location = useLocation() as any;
  const { mutateAsync: doLogin, isPending } = usePostIdiomaLogin();



  const handleLogin = async (data: any) => {

    const res: any = await doLogin({
      idioma: "en",
      data: { user: data.email, password: data.password },
    });

    const ok = res?.ok ?? true;
    if (!ok) {
      throw new Error(res?.message ?? "Credenciales inválidas");
    }

    const token = res?.data?.token_api;

    console.log('res: ',  res);

    console.log('token: ', token);

    const exp = res?.exp ?? res?.expires_in;
    const expiresAt = computeExpiresAt(exp);

    const user =
    res?.data ??
    {
      id: String(res?.id),
      email: data.email,
      name: res?.name,
      roles: res?.roles,
    };

    login({ userToken: token, expiresAt, user });
    const to = location.state?.from?.pathname || "/";
    navigate(to, { replace: true });
    return { handleLogin, isLoggingIn: isPending };
      
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

function computeExpiresAt(exp: any) {
  return exp ? Date.now() + exp * 1000 : Date.now() + 60 * 60 * 1000;
}
