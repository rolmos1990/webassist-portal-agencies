import logo from "../assets/images/logo2.png";
import LoginForm from "../components/Forms/LoginForm";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { doLogin, isLoggingIn } = useLogin();

  return (
    <section className="container bg-white border rounded-4 p-5 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
      <div className="mb-4">
        <img src={logo} alt="We Assist logo" />
      </div>

      <div className="d-flex flex-column">
        <h1 className="fw-bold fs-3">Welcome Back!👋</h1>
        <p className="text-secondary">Please enter your login details!</p>
      </div>

      <LoginForm
        onSubmit={(data) => doLogin({ email: data.email, password: data.password })}
        isLoading={isLoggingIn}
      />

      <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-sm-1">
        <span>Don’t have an account?</span>
        <a className="text-decoration-none" href="#">Create an Account</a>
      </div>
    </section>
  );
};

export default Login;
