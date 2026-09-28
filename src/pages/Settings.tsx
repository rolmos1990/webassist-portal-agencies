import SettingsGeneralForm, { type SettingsGeneralFormData } from "../components/Forms/SettingsGeneralForm";
import TabPanel from "../components/TabPanel";
import Breadcrumb from "../components/Breadcrumb";
import SettingsAccountForm, { type SettingsAccountFormData } from "../components/Forms/SettingsAccountForm";
import SettingsAgencyForm, { type SettingsAgencyFormData } from "../components/Forms/SettingsAgencyForm";
import { t } from "i18next";
import { useI18nCache } from "../i18n/i18nCacheProvider";
import { useEffect, useState } from "react";
import {
  getPerfilAgente,
  getPerfilAgencia,
  useActualizarIdiomaAgente,
  useActualizarPerfilAgencia,
  useActualizarPerfilAgente,
} from "../api/generated";
import { useCountryOptions } from "../hooks/useCountryOptions";
import type { AgenciaItem, AgenteItem } from "../api/schemas";
import { toast } from "../services/toast";
import { format } from "date-fns";
import { getApiErrorMessage } from "../api/errors/ApiError";
import { useSecurityStore } from "../stores/securityStore";
import { SecurityRole } from "../stores/SecurityRole";

const formatLastLogin = (unixSeconds?: string): string => {
  if (!unixSeconds) return "";
  const ms = Number(unixSeconds) * 1000;
  if (!Number.isFinite(ms)) return "";
  return format(new Date(ms), "MMM dd, yyyy hh:mm a");
};

const toAccountProfile = (data?: AgenteItem): SettingsAccountFormData => ({
  email: data?.email ?? "",
  nombre: data?.nombre ?? "",
  apellido: data?.apellido ?? "",
  phone: data?.telefono ?? "",
  pais: data?.pais?.id != null ? String(data.pais.id) : "",
  correoAlternativo: data?.correo_renovaciones_alternativo ?? "",
  emailNotifications: !!data?.recibir_correos_renovaciones,
});

const toAgencyProfile = (data?: AgenciaItem): SettingsAgencyFormData => ({
  nombrePadre: data?.padre?.nombre ?? "",
  nombre: data?.nombre ?? "",
  razonSocial: data?.razon_social ?? "",
  ruc: data?.ruc ?? "",
  direccion: data?.direccion ?? "",
  telefono: data?.telefono ?? "",
  email: data?.email ?? "",
  contacto: data?.contacto ?? "",
  emailSecundario: data?.email_secundario ?? "",
  sitioWeb: data?.sitio_web ?? "",
  enviarCopiaVouchers: !!data?.enviar_copia_vouchers,
});

export default function Settings() {

    const [loading, setLoading] = useState(false);
    const { lang, setLang } = useI18nCache();
    const { mutateAsync: actualizarIdioma } = useActualizarIdiomaAgente();
    const { mutateAsync: actualizarPerfilAgente } = useActualizarPerfilAgente();
    const { mutateAsync: actualizarPerfilAgencia } = useActualizarPerfilAgencia();
    const isAgentAdmin = useSecurityStore((s) => s.hasRole(SecurityRole.AGENT_ADMIN));

    const countryOptions = useCountryOptions();

    const [generalProfile, setGeneralProfile] = useState<SettingsGeneralFormData>({
      language: "en",
      tipoPago: "",
      ultimoLogin: "",
      whatsapp: "",
      comision: 0
    });

    const [accountProfile, setAccountProfile] = useState<SettingsAccountFormData>(toAccountProfile());

    const [agencyProfile, setAgencyProfile] = useState<SettingsAgencyFormData>(toAgencyProfile());

  const notifySaved = () => toast.success(t("feedback.savedTitle"), t("feedback.saved"));

  // Muestra el error y lo propaga para que el formulario marque los campos (errores por campo)
  const failSave = (e: unknown): never => {
    toast.error("Error", getApiErrorMessage(e, t('error_generico')));
    throw e;
  };

  const onGeneralSubmit = async (data: SettingsGeneralFormData) => {
    try {
      if (data.whatsapp !== generalProfile.whatsapp) {
        const res = await actualizarPerfilAgente({ idioma: lang, data: { whatsapp: data.whatsapp } });
        setGeneralProfile((prev) => ({ ...prev, whatsapp: res.data?.whatsapp ?? data.whatsapp }));
      }
      if (data.language !== lang) {
        await actualizarIdioma({ idioma: lang, data: { idioma: data.language } });
        setLang(data.language);
      }
      notifySaved();
    } catch (e) {
      failSave(e);
    }
  };

  const onAccountSubmit = async (data: SettingsAccountFormData) => {
    try {
      const res = await actualizarPerfilAgente({
        idioma: lang,
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.phone,
          pais: data.pais ? Number(data.pais) : undefined,
          correo_renovaciones_alternativo: data.correoAlternativo,
          recibir_correos_renovaciones: data.emailNotifications,
        },
      });
      setAccountProfile(toAccountProfile(res.data));
      notifySaved();
    } catch (e) {
      failSave(e);
    }
  };

  const onAgencySubmit = async (data: SettingsAgencyFormData) => {
    try {
      const res = await actualizarPerfilAgencia({
        idioma: lang,
        data: {
          telefono: data.telefono,
          contacto: data.contacto,
          email: data.email,
          email_secundario: data.emailSecundario,
          sitio_web: data.sitioWeb,
          enviar_copia_vouchers: data.enviarCopiaVouchers,
        },
      });
      setAgencyProfile(toAgencyProfile(res.data));
      notifySaved();
    } catch (e) {
      failSave(e);
    }
  };

  const onGetProfile = async () => {
      try {
      setLoading(true);
      const res = await getPerfilAgente(lang);
      if(res.ok){
        const data = res.data;

        setGeneralProfile({
          language: data?.idioma_user ?? "en",
          tipoPago: data?.tipo_pago?.nombre ?? "",
          ultimoLogin: formatLastLogin(data?.ultimo_login),
          whatsapp: data?.whatsapp ?? "",
          comision: Number(data?.comision ?? 0)
        });

        setAccountProfile(toAccountProfile(data));
      }
      } catch (e) {
      toast.error("Error", getApiErrorMessage(e, t('error_generico')));
      } finally {
      setLoading(false);
      }
  };

  const onGetAgencyProfile = async () => {
      try {
      const res = await getPerfilAgencia(lang);
      if(res.ok){
        setAgencyProfile(toAgencyProfile(res.data));
      }
      } catch (e) {
      toast.error("Error", getApiErrorMessage(e, t('error_generico')));
      }
  };

  useEffect(() => {
    onGetProfile();
    onGetAgencyProfile();
  }, []);

  if (loading) {
    return (
        <div className="container-fluid py-4">
        <Breadcrumb title={t('settings')} description={t('manage_your_account_settings')} />
        <div className="card shadow p-4">
            <div className="p-4">
                <TabPanel
                    tabs={[
                        {
                            id: 'general-settings',
                            title: t('general'),
                            content: (
                                <div className="my-4">
                                    <div className="spinner-border" role="status" />
                                </div>
                            )
                        },
                        {
                            id: 'account-settings',
                            title: t('cuenta'),
                            content: (
                                <div className="my-4">
                                    <div className="spinner-border" role="status" />
                                </div>
                            )
                        },
                        {
                            id: 'agency-settings',
                            title: t('agencia'),
                            content: (
                                <div className="my-4">
                                    <div className="spinner-border" role="status" />
                                </div>
                            )
                        }
                    ]}
                    defaultActiveTab="general-settings"
                    />

            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
        <Breadcrumb title={t('settings')} description={t('manage_your_account_settings')} />
        <div className="card shadow">
                <div className="p-4">
                    <TabPanel
                    tabs={[
                        {
                            id: 'general-settings',
                            title: t('general'),
                            content: (
                                <div className="my-4">
                                    <SettingsGeneralForm
                                    initialValues={generalProfile}
                                    onSubmit={onGeneralSubmit}
                                    onCancel={() => {}}
                                    isEditable={false}
                                    />
                                </div>
                            )
                        },
                        {
                            id: 'account-settings',
                            title: t('cuenta'),
                            content: (
                                <div className="my-4">
                                    <SettingsAccountForm
                                    initialValues={accountProfile}
                                    countryOptions={countryOptions}
                                    onSubmit={onAccountSubmit}
                                    onCancel={() => {}}
                                    isEditable={false}
                                    />
                                </div>
                            )
                        },
                        {
                            id: 'agency-settings',
                            title: t('agencia'),
                            content: (
                                <SettingsAgencyForm
                                initialValues={agencyProfile}
                                onSubmit={onAgencySubmit}
                                onCancel={() => {}}
                                isEditable={false}
                                canEdit={isAgentAdmin}
                                />
                            )
                        }
                    ]}
                    defaultActiveTab="general-settings"
                    />
                </div>
            </div>
        </div>
  );
}
