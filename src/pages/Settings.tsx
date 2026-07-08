import SettingsGeneralForm, { type SettingsGeneralFormData } from "../components/Forms/SettingsGeneralForm";
import TabPanel from "../components/TabPanel";
import Breadcrumb from "../components/Breadcrumb";
import SettingsAccountForm, { type SettingsAccountFormData } from "../components/Forms/SettingsAccountForm";
import { t } from "i18next";
import { useI18nCache } from "../i18n/i18nCacheProvider";
import { useEffect, useState } from "react";
import { getPerfilAgente } from "../api/generated";
import { toast } from "../services/toast";

export default function Settings() {

    const [loading, setLoading] = useState(false);
    const { lang } = useI18nCache();

    const [profile, setProfile] = useState<SettingsGeneralFormData>({
      language: "en",
      defaultComissionRate: 0,
      renewalComissionRate: 0,
      minimiumRenevueTarget: 0
    });

  const onGeneralSubmit = (data: SettingsGeneralFormData) => {
    console.log(data);
  };

  const onAccountSubmit = (data: SettingsAccountFormData) => {
    console.log(data);
  };

  const onAgencySubmit = (data: SettingsAccountFormData) => {
    console.log(data);
  };

  const onGetProfile = async () => {
      try {
      setLoading(true);
      const res = await getPerfilAgente(lang);
      if(res.ok){
        const data = res.data;
        var dataProfile : SettingsGeneralFormData = {
          language: data?.idioma_user ?? "en",
          defaultComissionRate: Number(data?.comision ?? 0),
          renewalComissionRate: Number(data?.comision ?? 0),
          minimiumRenevueTarget: Number(data?.comision ?? 0)
        };
        setProfile(dataProfile);
      }
      } catch (e) {
      toast.error("Error", t('error_generico'));
      } finally {
      setLoading(false);
      }
  };

  useEffect(() => {
    onGetProfile();
  }, []);

  if (loading || !profile) {
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
                                    initialValues={profile}
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
                                    initialValues={profile ?? {}}
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
                                <SettingsAccountForm
                                initialValues={profile ?? {}}
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
