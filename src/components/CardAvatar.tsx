import type { ReactNode } from "react";
import { Avatar } from "./Avatar";
import { StatusBadge } from "./StatusBadge";
import type { StatusBadgeProps } from "./StatusBadge";
import { defaultStatusTheme } from "./StatusBadge/StatusBadgeThemes";

interface CardAvatarProps {
  avatarUrl?: string;
  name: string;
  status: StatusBadgeProps['status'];
  /** Texto del estado; si no viene se usa el label del theme */
  statusLabel?: StatusBadgeProps['label'];
  /** Theme de colores del estado (por defecto defaultStatusTheme) */
  statusTheme?: StatusBadgeProps['theme'];
  email: string;
  phone: string;
  location: string;
  className?: string;
  /** Contenido opcional arriba a la derecha (p. ej. agencia asociada) */
  rightContent?: ReactNode;
  /** Contenido opcional debajo de la ubicación, con el mismo estilo (p. ej. tipo de pago) */
  extraInfo?: ReactNode;
}

export const CardAvatar = ({
  avatarUrl,
  name,
  status,
  statusLabel,
  statusTheme = defaultStatusTheme,
  email,
  phone,
  location,
  className = '',
  rightContent,
  extraInfo,
}: CardAvatarProps) => {
  return (
    <div className={`col-12 border-bottom w-100 mx-auto ${className}`}>
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row gap-3 align-items-start">
          <div className="flex-shrink-0">
            <Avatar src={avatarUrl} name={name} size={80} />
          </div>

          <div className="flex-grow-1 text-center text-md-start">
            <h4 className="mb-2 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-2">
              {name}
              <div className="ms-md-2 mt-2 mt-md-0">
                <StatusBadge status={status} label={statusLabel} theme={statusTheme} />
              </div>
            </h4>

            <p className="mb-1 text-gray small pb-1">
              <i className="bi bi-envelope me-2 text-success"></i>
              {email}
            </p>
            <p className="mb-1 text-gray small pb-1">
              <i className="bi bi-telephone me-2 text-success"></i>
              {phone}
            </p>
            <p className="mb-0 text-gray small pb-1">
              <i className="bi bi-geo-alt me-2 text-success"></i>
              {location}
            </p>
            {extraInfo && <p className="mt-1 mb-0 text-gray small pb-1">{extraInfo}</p>}
          </div>

          {rightContent && (
            <div className="flex-shrink-0 align-self-stretch align-self-md-auto text-center text-md-end">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};