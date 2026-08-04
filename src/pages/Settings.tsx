import SettingsGeneralForm, { type SettingsGeneralFormData } from "../components/Forms/SettingsGeneralForm";
import TabPanel from "../components/TabPanel";
import Breadcrumb from "../components/Breadcrumb";
import SettingsAccountForm, { type SettingsAccountFormData } from "../components/Forms/SettingsAccountForm";
import SettingsAgencyForm, { type SettingsAgencyFormData } from "../components/Forms/SettingsAgencyForm";
import { t } from "i18next";
import { useI18nCache } from "../i18n/i18nCacheProvider";
import { useEffect, useState } from "react";
import { getPerfilAgente, getPerfilAgencia, useActualizarIdiomaAgente } from "../api/generated";
import { toast } from "../services/toast";
import { format } from "date-fns";
import { getApiErrorMessage } from "../api/errors/ApiError";

const formatLastLogin = (unixSeconds?: string): string => {
  if (!unixSeconds) return "";
  const ms = Number(unixSeconds) * 1000;
  if (!Number.isFinite(ms)) return "";
  return format(new Date(ms), "MMM dd, yyyy hh:mm a");
};

export default function Settings() {

    const [loading, setLoading] = useState(false);
    const { lang, setLang } = useI18nCache();
    const { mutateAsync: actualizarIdioma } = useActualizarIdiomaAgente();

    const [generalProfile, setGeneralProfile] = useState<SettingsGeneralFormData>({
      language: "en",
      tipoPago: "",
      ultimoLogin: "",
      whatsapp: "",
      comision: 0
    });

    const [accountProfile, setAccountProfile] = useState<SettingsAccountFormData>({
      email: "",
      phone: "",
      emailNotifications: false,
    });

    const [agencyProfile, setAgencyProfile] = useState<SettingsAgencyFormData>({
      nombrePadre: "",
      nombre: "",
      razonSocial: "",
      ruc: "",
      telefono: "",
      email: "",
      direccion: "",
    });

  const onGeneralSubmit = async (data: SettingsGeneralFormData) => {
    if (data.language === lang) return;
    try {
      await actualizarIdioma({ idioma: lang, data: { idioma: data.language } });
      setLang(data.language);
    } catch (e) {
      toast.error("Error", getApiErrorMessage(e, t('error_generico')));
    }
  };

  const onAccountSubmit = (data: SettingsAccountFormData) => {
    console.log(data);
  };

  const onAgencySubmit = (data: SettingsAgencyFormData) => {
    console.log(data);
  };

  const onGetProfile = async () => {
      try {
      setLoading(true);
      const res = await getPerfilAgente(lang);
      if(res.ok){
        const data = res.data;

        setGeneralProfile({
          language: data?.idioma_user ?? "en",
          tipoPago: data?.tipo_pago ?? "",
          ultimoLogin: formatLastLogin(data?.ultimo_login),
          whatsapp: data?.whatsapp ?? "",
          comision: Number(data?.comision ?? 0)
        });

        setAccountProfile({
          email: data?.email ?? "",
          phone: data?.telefono ?? "",
          emailNotifications: !!data?.recibir_correos_renovaciones,
        });
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
        const data = res.data;

        setAgencyProfile({
          nombrePadre: data?.nombre_padre ?? "",
          nombre: data?.nombre ?? "",
          razonSocial: data?.razon_social ?? "",
          ruc: data?.ruc ?? "",
          telefono: data?.telefono ?? "",
          email: data?.email ?? "",
          direccion: data?.direccion ?? "",
        });
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
