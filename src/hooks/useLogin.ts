import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePostAgenteLogin } from "../api/generated";
import { useAuthStore } from "../stores/useAuthStore";
import { ApiError } from "../api/errors/ApiError";
import { toast } from "../services/toast";
import { useTranslation } from "react-i18next";

type LoginFormData = { email: string; password: string };

const computeExpiresAt = (exp?: number | string | null) =>
  exp ? Date.now() + Number(exp) * 1000 : Date.now() + 60 * 60 * 1000;

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const login = useAuthStore((s) => s.login);
  const { mutateAsync: postLogin, isPending } = usePostAgenteLogin();
  const { i18n, t } = useTranslation();

  const idioma = useMemo(
    () => i18n.language.split("-")[0], 
    [i18n.language]
  );

  const doLogin = useCallback(
    async ({ email, password }: LoginFormData) => {
      try {
        const res: any = await postLogin({
          idioma,
          data: { user: email, pw: password },
        });

        const token = res?.data?.token_api;
        if (!token) throw new ApiError("No se recibió token válido", 400, res);

        const exp = res?.exp ?? res?.expires_in;
        const expiresAt = computeExpiresAt(exp);

        const user =
          res?.data ?? {
            id: String(res?.id ?? email),
            email,
            name: res?.name,
            roles: res?.roles,
          };

        login({ userToken: token, expiresAt, user });

        const to = location?.state?.from?.pathname || "/";
        navigate(to, { replace: true });

        return true;
      } catch (err: any) {
        if (err instanceof ApiError) {
          toast.error(t("login_agente"), err.message);
        } else {
          console.error("Unexpected Error:", err);
          toast.error(t("login_agente"), t("error_desconocido", "Error desconocido"));
        }
        return false;
      }
    },
    [postLogin, idioma, login, location?.state, navigate, t]
  );

  return useMemo(
    () => ({ doLogin, isLoggingIn: isPending }),
    [doLogin, isPending]
  );
}
