import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

import { RowView } from '../RowView';
import { UIButton } from '../Button';
import InputText from './Inputs/InputText';
import InputSwitch from './Inputs/InputSwitch';

export interface SettingsAccountFormData {
  email: string;
  phone?: string;
  emailNotifications: boolean;
}

const schema = yup.object({
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  phone: yup.string().trim().optional().matches(/^\+?[0-9\s-]*$/, 'Invalid phone'),
  emailNotifications: yup.boolean().optional(),
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
