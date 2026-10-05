import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { UIButton } from './Button';

interface ProfileSectionProps {
  title: string;
  /** Sin onEdit la sección es sólo lectura (no muestra el botón Edit) */
  editable?: boolean;
  submitting?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  children: ReactNode;
}

/** Tarjeta de una sección del perfil: título + Edit, o Cancel/Save mientras se edita (el Save es submit del form que la envuelve) */
export function ProfileSection({ title, editable = false, submitting = false, onEdit, onCancel, children }: ProfileSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="border rounded-3 p-4">
      <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
        <h5 className="mb-0">{title}</h5>
        {onEdit && (
          !editable ? (
            <UIButton variant="outline-primary" icon="bi bi-pencil" onClick={onEdit} type="button">
              {t('editar')}
            </UIButton>
          ) : (
            <div className="d-flex gap-2">
              <UIButton variant="outline-secondary" onClick={onCancel} type="button">
                {t('cancelar')}
              </UIButton>
              <UIButton variant="primary" type="submit" disabled={submitting}>
                {t('guardar')}
              </UIButton>
            </div>
          )
        )}
      </div>
      <div className="row g-4">{children}</div>
    </div>
  );
}

interface ProfileFieldProps {
  label: string;
  edit?: boolean;
  show: ReactNode;
  editNode?: ReactNode;
}

/** Celda label/valor de una sección del perfil (3 columnas en desktop) */
export function ProfileField({ label, edit = false, show, editNode }: ProfileFieldProps) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="text-secondary small mb-1">{label}</div>
      <div className="fw-semibold">{edit && editNode ? editNode : show}</div>
    </div>
  );
}
