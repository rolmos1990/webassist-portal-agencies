import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

import { RowView } from '../RowView';
import { UIButton } from '../Button';
import InputText from './Inputs/InputText';
import InputTextarea from './Inputs/InputTextArea';
import InputSwitch from './Inputs/InputSwitch';

export interface SettingsAccountFormData {
  companyName: string;
  email: string;
  phone?: string;
  address?: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  appNotifications: boolean;
}

const schema = yup.object({
  companyName: yup.string().trim().required('Company name is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  phone: yup.string().trim().optional().matches(/^\+?[0-9\s-]*$/, 'Invalid phone'),
  address: yup.string().trim().optional(),
  emailNotifications: yup.boolean().optional(),
  smsNotifications: yup.boolean().optional(),
  appNotifications: yup.boolean().optional(),
});

interface Props {
  initialValues?: Partial<SettingsAccountFormData>;
  onSubmit: (data: SettingsAccountFormData) => void;
  onCancel: () => void;
  isEditable?: boolean;
}

export default function SettingsAccountForm({
  initialValues,
  onSubmit,
  onCancel,
  isEditable = false,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SettingsAccountFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const watched = useWatch({ control });
  const [editable, setEditable] = useState<boolean>(isEditable);
  const onOff = (v?: boolean) => (v ? 'Enabled' : 'Disabled');

  const handleFormSubmit = (data: SettingsAccountFormData) => {
    onSubmit(data);
    setEditable(false);
    // reset(data); // si prefieres fijar lo enviado como base
  };

  const handleCancel = () => {
    reset(); // vuelve a defaults + initialValues
    setEditable(false);
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)} className="d-flex flex-column gap-3" noValidate>
      <h6 className="text-black fw-semibold mb-2 border-bottom pb-2">Account Settings</h6>

      {/* Company Name */}
      <RowView
        label="Company Name"
        edit={editable}
        show={<span>{watched.companyName || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="companyName"
            placeholder="Company Name"
            register={register}
            error={errors.companyName}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Primary Contact Email */}
      <RowView
        label="Primary Contact Email"
        edit={editable}
        show={<span>{watched.email || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="email"
            type="email"
            placeholder="email@company.com"
            register={register}
            error={errors.email}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Phone */}
      <RowView
        label="Phone"
        edit={editable}
        show={<span>{watched.phone || '—'}</span>}
        editNode={
          <InputText
            label=""
            name="phone"
            type="tel"
            placeholder="+50767891234"
            register={register}
            error={errors.phone}
            mainClassName="mb-0"
            className="rounded-pill"
          />
        }
      />

      {/* Address */}
      <RowView
        label="Address"
        edit={editable}
        show={<span style={{ whiteSpace: 'pre-line' }}>{watched.address || '—'}</span>}
        editNode={
          <InputTextarea
            label=""
            name="address"
            placeholder="Street, building, apartment, city…"
            rows={3}
            maxLength={300}
            register={register}
            error={errors.address}
            mainClassName="mb-0"
            className="rounded-3"
          />
        }
      />
      <hr className="border-0" />
      <h6 className="text-black fw-semibold mb-2 border-bottom pb-2">Notifications and Alerts</h6>
      <RowView
        label="Email Notifications"
        edit={editable}
        show={<span>{onOff(watched.emailNotifications)}</span>}
        editNode={
          <InputSwitch
            label=""
            name="emailNotifications"
            register={register}
            error={errors.emailNotifications as any}
          />
        }
      />

      <RowView
        label="SMS Notifications"
        edit={editable}
        show={<span>{onOff(watched.smsNotifications)}</span>}
        editNode={
          <InputSwitch
            label=""
            name="smsNotifications"
            register={register}
            error={errors.smsNotifications as any}
          />
        }
      />

      <RowView
        label="App Notifications"
        edit={editable}
        show={<span>{onOff(watched.appNotifications)}</span>}
        editNode={
          <InputSwitch
            label=""
            name="appNotifications"
            register={register}
            error={errors.appNotifications as any}
          />
        }
      />

      <div className="bg-transparent d-flex justify-content-end mt-2">
        {!editable ? (
          <UIButton variant="primary" onClick={() => setEditable(true)} type="button">
            Edit
          </UIButton>
        ) : (
          <div className="d-flex gap-2">
            <UIButton variant="outline-secondary" onClick={handleCancel} type="button">
              Cancel
            </UIButton>
            <UIButton variant="primary" type="submit">
              Save
            </UIButton>
          </div>
        )}
      </div>
    </form>
  );
}