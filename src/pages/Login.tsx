import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import LoginForm from '../components/Forms/LoginForm';
import { useAuthStore } from '../stores/useAuthStore';
import { useLocation } from 'react-router-dom';
import { usePostAgenteLogin } from '../api/generated';
import { ApiError } from "../api/errors/ApiError";
import { toast } from "../services/toast";
import { useTranslation } from "react-i18next";



const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const location = useLocation() as any;
  const { mutateAsync: postLogin, isPending } = usePostAgenteLogin();
  const { i18n } = useTranslation(); // ✅ añadimos esto



  const handleLogin = async (data: any) => {
    try {
      const res: any = await postLogin({
        idioma: i18n.language,
        data: { user: data.email, pw: data.password },
      });

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
  
      login({ userToken: res?.data?.token_api, expiresAt, user });
  
      const to = location.state?.from?.pathname || "/";
      navigate(to, { replace: true });
  
    } catch (err: any) {  
      if (err instanceof ApiError) {
        toast.error(i18n.t("login_agente"), err.message);
        return;
      }
  
      toast.error(i18n.t("login_agente"), "Error desconocido");
    }
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
