import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RowView } from '../RowView';
import { UIButton } from '../Button';
import InputText from './Inputs/InputText';
import InputSwitch from './Inputs/InputSwitch';
import { applyApiFieldErrors } from '../../api/errors/applyApiFieldErrors';

export interface SettingsAgencyFormData {
  // Solo lectura (el servicio no permite modificarlos)
  nombrePadre: string;
  nombre: string;
  razonSocial: string;
  ruc: string;
  direccion: string;
  // Editables
  telefono: string;
  email: string;
  contacto: string;
  emailSecundario: string;
  sitioWeb: string;
  enviarCopiaVouchers: boolean;
}

const schema = yup.object({
  nombrePadre: yup.string().defined(),
  nombre: yup.string().defined(),
  razonSocial: yup.string().defined(),
  ruc: yup.string().defined(),
  direccion: yup.string().defined(),
  telefono: yup.string().trim().defined().matches(/^\+?[0-9\s-]*$/, 'Invalid phone'),
  email: yup.string().trim().email('Invalid email').defined(),
  contacto: yup.string().trim().defined(),
  emailSecundario: yup.string().trim().email('Invalid email').defined(),
  sitioWeb: yup.string().trim().defined(),
  enviarCopiaVouchers: yup.boolean().required(),
});

// campo de la API -> campo del formulario
const API_FIELD_MAP = {
  telefono: 'telefono',
  email: 'email',
  contacto: 'contacto',
  email_secundario: 'emailSecundario',
  sitio_web: 'sitioWeb',
  enviar_copia_vouchers: 'enviarCopiaVouchers',
} as const;

interface Props {
  initialValues?: Partial<SettingsAgencyFormData>;
  /** Si rechaza, el formulario sigue en edición y muestra los errores por campo del servicio */
  onSubmit: (data: SettingsAgencyFormData) => Promise<void> | void;
  onCancel: () => void;
  isEditable?: boolean;
  /** Solo el agente administrador puede modificar la agencia */
  canEdit?: boolean;
}

export default function SettingsAgencyForm({
  initialValues,
  onSubmit,
  onCancel,
  isEditable = false,
  canEdit = true,
}: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SettingsAgencyFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  // Los datos llegan/actualizan desde el servicio después del primer render
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const watched = useWatch({ control });
  const [editable, setEditable] = useState<boolean>(isEditable);
  const yesNo = (v?: boolean) => (v ? t('common.enabled') : t('common.disabled'));

  const handleFormSubmit = async (data: SettingsAgencyFormData) => {
    try {
      await onSubmit(data);
      setEditable(false);
    } catch (e) {
      applyApiFieldErrors(e, setError, API_FIELD_MAP, t);
    }
  };

  const handleCancel = () => {
    reset();
    setEditable(false);
    onCancel();
  };

  const readOnlyRow = (label: string, value?: string, preLine = false) => (
    <RowView
      label={label}
      edit={false}
      show={<span style={preLine ? { whiteSpace: 'pre-line' } : undefined}>{value || '—'}</span>}
      editNode={null}
    />
  );

  const textRow = (
    label: string,
    name: 'telefono' | 'email' | 'contacto' | 'emailSecundario' | 'sitioWeb',
    placeholder: string,
    type?: 'text' | 'tel' | 'email'
  ) => (
    <RowView
      label={label}
      edit={editable}
      show={<span>{watched[name] || '—'}</span>}
      editNode={
        <InputText
          label=""
          name={name}
          type={type}
          placeholder={placeholder}
          register={register}
          error={errors[name]}
          mainClassName="mb-0"
          className="rounded-pill"
        />
      }
    />
  );

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)} className="d-flex flex-column gap-3" noValidate>
      <h6 className="text-black fw-semibold mb-2 border-bottom pb-2">{t('settingsPage.agency.title')}</h6>

      {readOnlyRow(t('settingsPage.agency.parentAgency'), watched.nombrePadre)}
      {readOnlyRow(t('settingsPage.agency.agencyName'), watched.nombre)}
      {readOnlyRow(t('settingsPage.agency.legalName'), watched.razonSocial)}
      {readOnlyRow(t('settingsPage.agency.ruc'), watched.ruc)}

      {textRow(t('settingsPage.agency.phone'), 'telefono', '+50767891234', 'tel')}
      {textRow(t('settingsPage.agency.contact'), 'contacto', t('settingsPage.agency.contact'))}
      {textRow(t('settingsPage.agency.email'), 'email', 'email@company.com', 'email')}
      {textRow(t('settingsPage.agency.secondaryEmail'), 'emailSecundario', 'email@company.com', 'email')}
      {textRow(t('settingsPage.agency.website'), 'sitioWeb', 'https://www.company.com')}

      {readOnlyRow(t('settingsPage.agency.address'), watched.direccion, true)}

      <RowView
        label={t('settingsPage.agency.sendVoucherCopies')}
        edit={editable}
        show={<span>{yesNo(watched.enviarCopiaVouchers)}</span>}
        editNode={
          <InputSwitch
            label=""
            name="enviarCopiaVouchers"
            register={register}
            error={errors.enviarCopiaVouchers}
          />
        }
      />

      {canEdit && (
        <div className="bg-transparent d-flex justify-content-end mt-2">
          {!editable ? (
            <UIButton variant="primary" onClick={() => setEditable(true)} type="button">
              {t('common.edit')}
            </UIButton>
          ) : (
            <div className="d-flex gap-2">
              <UIButton variant="outline-secondary" onClick={handleCancel} type="button">
                {t('common.cancel')}
              </UIButton>
              <UIButton variant="primary" type="submit" disabled={isSubmitting}>
                {t('common.save')}
              </UIButton>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
