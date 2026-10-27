import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo2.png';
import { UIButton } from '../components/Button';
import ForgotPasswordForm, { type ForgotPasswordFormData } from '../components/Forms/ForgotPasswordForm';
import VerifyOtpForm, { type VerifyOtpFormData } from '../components/Forms/VerifyOtpForm';
import CreateNewPasswordForm, { type CreateNewPasswordFormData } from '../components/Forms/CreateNewPasswordForm';
import UIModal from '../components/UIModal';
import { useCambiarPassword, useSolicitarOtpPassword, useValidarOtpPassword } from '../api/generated';
import { ApiError, getApiErrorMessage } from '../api/errors/ApiError';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { useAuthStore } from '../stores/useAuthStore';
import { toast } from '../services/toast';
import { PATHS } from '../routes/Routes';

/**
 * Flujo de cambio de clave: email -> código OTP -> nueva clave.
 * El reset_token vive sólo en el estado de este componente (no se guarda en storage,
 * store ni historial): si el usuario recarga o cierra la ventana, el flujo empieza de nuevo.
 */
type Step =
  | { kind: 'email' }
  | { kind: 'otp'; email: string }
  | { kind: 'password'; email: string; resetToken: string; expiresAt: number | null }
  | { kind: 'done' };

// Sin caché de mutaciones: las variables (otp, reset_token, password) no quedan en memoria de React Query
const NO_CACHE = { mutation: { gcTime: 0 } };

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang } = useI18nCache();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const [step, setStep] = useState<Step>({ kind: 'email' });

  const { mutateAsync: solicitarOtp } = useSolicitarOtpPassword(NO_CACHE);
  const { mutateAsync: validarOtp } = useValidarOtpPassword(NO_CACHE);
  const { mutateAsync: cambiarPassword } = useCambiarPassword(NO_CACHE);

  // El cambio de clave se hace siempre sin sesión
  useEffect(() => {
    if (isAuthenticated) logout();
  }, [isAuthenticated, logout]);

  // Al vencer el reset_token se vuelve a pedir el código
  const expiresAt = step.kind === 'password' ? step.expiresAt : null;
  useEffect(() => {
    if (expiresAt === null) return;
    const timer = window.setTimeout(() => {
      setStep({ kind: 'email' });
      toast.warning(t('passwordReset.expiredTitle'), t('passwordReset.expired'));
    }, Math.max(expiresAt - Date.now(), 0));
    return () => window.clearTimeout(timer);
  }, [expiresAt, t]);

  const requestOtp = async (email: string) => {
    try {
      await solicitarOtp({ idioma: lang, data: { email } });
      toast.success(t('passwordReset.codeSentTitle'), t('passwordReset.codeSent'));
    } catch (e) {
      toast.error('Error', getApiErrorMessage(e, t('error_generico')));
      throw e;
    }
  };

  const handleEmailSubmit = async ({ email }: ForgotPasswordFormData) => {
    await requestOtp(email);
    setStep({ kind: 'otp', email });
  };

  const handleOtpSubmit = async ({ otp }: VerifyOtpFormData) => {
    if (step.kind !== 'otp') return;
    try {
      const res = await validarOtp({ idioma: lang, data: { email: step.email, otp } });
      if (!res.reset_token) throw new ApiError(t('error_generico'));
      setStep({
        kind: 'password',
        email: step.email,
        resetToken: res.reset_token,
        expiresAt: res.expira_en ? Date.now() + res.expira_en * 1000 : null,
      });
    } catch (e) {
      toast.error('Error', getApiErrorMessage(e, t('error_generico')));
      throw e;
    }
  };

  const handlePasswordSubmit = async ({ password }: CreateNewPasswordFormData) => {
    if (step.kind !== 'password') return;
    try {
      await cambiarPassword({
        idioma: lang,
        data: { email: step.email, reset_token: step.resetToken, password },
      });
      setStep({ kind: 'done' });
    } catch (e) {
      toast.error('Error', getApiErrorMessage(e, t('error_generico')));
      // Token vencido o inválido: hay que pedir un código nuevo
      if (e instanceof ApiError && e.fieldErrors?.reset_token) {
        setStep({ kind: 'email' });
        return;
      }
      throw e;
    }
  };

  const goToLogin = () => navigate(PATHS.auth.login(), { replace: true });

  const header = {
    email: { title: t('passwordReset.title'), subtitle: t('passwordReset.subtitle') },
    otp: { title: t('passwordReset.otpTitle'), subtitle: t('passwordReset.otpSubtitle') },
    password: { title: t('passwordReset.newPasswordTitle'), subtitle: t('passwordReset.newPasswordSubtitle') },
    done: { title: t('passwordReset.newPasswordTitle'), subtitle: '' },
  }[step.kind];

  return (
    <>
            <UIModal
            show={step.kind === 'done'}
            onClose={goToLogin}
            icon="success"
            title={t('passwordReset.successTitle')}
            subtitle={t('passwordReset.success')}
            primaryLabel={t('passwordReset.backToLogin')}
            onPrimaryClick={goToLogin}
            backdrop="static"
            keyboard={true}
            />

            <section className="container bg-white border rounded-4 p-5 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="mb-4">
              <img src={logo} alt="We Assist logo" />
            </div>
            <div className="d-flex flex-column">
              <h1 className="fw-bold fs-3">{header.title}</h1>
              <p className="text-secondary">
                {header.subtitle}
                {step.kind === 'otp' && <> <b>{step.email}</b></>}
              </p>
            </div>

            {step.kind === 'email' && <ForgotPasswordForm onSubmit={handleEmailSubmit} />}
            {step.kind === 'otp' && (
              <VerifyOtpForm
                onSubmit={handleOtpSubmit}
                onResend={() => requestOtp(step.email).catch(() => undefined)}
              />
            )}
            {step.kind === 'password' && <CreateNewPasswordForm onSubmit={handlePasswordSubmit} />}

            <div className="d-flex flex-column flex-sm-row
                align-items-center align-items-sm-start
                justify-content-center
                gap-sm-1">
            <UIButton
                variant="whiteLink"
                icon="bi bi-arrow-left"
                iconPosition="left"
                onClick={goToLogin}
            >
                {t('passwordReset.backToLogin')}
            </UIButton>
            </div>

          </section>
    </>
)};

export default ForgotPassword;
