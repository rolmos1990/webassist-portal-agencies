import SettingsGeneralForm, { type SettingsGeneralFormData } from "../components/Forms/SettingsGeneralForm";
import TabPanel from "../components/TabPanel";
import Breadcrumb from "../components/Breadcrumb";
import SettingsAccountForm, { type SettingsAccountFormData } from "../components/Forms/SettingsAccountForm";

const initialSettings: SettingsGeneralFormData = {
  language: "English",
  timeZone: "(GMT-5) America/Panama",
  dateFormat: "dd/mm/yyyy",
  currency: "USD",
  defaultComissionRate: 25,
  renewalComissionRate: 16,
  minimiumRenevueTarget: 10000,
};

const initialSettingsAccount: SettingsAccountFormData = {
    companyName: "English",
    email: "English",
    emailNotifications: true,
    smsNotifications: true,
    appNotifications: true,
  };


export default function Settings() {
  const onGeneralSubmit = (data: SettingsGeneralFormData) => {
    console.log(data);
  };

  const onAccountSubmit = (data: SettingsAccountFormData) => {
    console.log(data);
  };
  
  return (
    <div className="container-fluid py-4">
        <Breadcrumb title="Settings" description="Manage your account settings" />
        <div className="card shadow">
            <div className="p-4">
            <TabPanel
            tabs={[
                {
                    id: 'general-settings',
                    title: 'General',
                    content: (
                        <div className="my-4">
                            <SettingsGeneralForm
                            initialValues={initialSettings}
                            onSubmit={onGeneralSubmit}
                            onCancel={() => {}}
                            isEditable={false}
                            />
                        </div>
                    )
                },
                {
                    id: 'account-settings',
                    title: 'Account',
                    content: (
                        <div className="my-4">
                            <SettingsAccountForm
                            initialValues={initialSettingsAccount}
                            onSubmit={onAccountSubmit}
                            onCancel={() => {}}
                            isEditable={false}
                            />
                        </div>
                    )
                },
                {
                    id: 'agency-settings',
                    title: 'Agency',
                    content: (
                        <SettingsAccountForm
                        initialValues={initialSettingsAccount}
                        onSubmit={onAccountSubmit}
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
