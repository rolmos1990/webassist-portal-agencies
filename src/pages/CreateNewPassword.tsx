import { Navigate } from 'react-router-dom';
import { PATHS } from '../routes/Routes';

/**
 * La nueva clave se crea dentro del flujo de ForgotPassword (requiere el reset_token en memoria).
 * Entrar directo a esta ruta reinicia el flujo.
 */
const CreateNewPassword = () => <Navigate to={PATHS.auth.forgotPassword()} replace />;

export default CreateNewPassword;
