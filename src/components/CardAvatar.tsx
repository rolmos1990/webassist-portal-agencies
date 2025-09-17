import { StatusBadge } from "./StatusBadge";
import type { StatusBadgeProps } from "./StatusBadge";
import { defaultStatusTheme } from "./StatusBadge/StatusBadgeThemes";

interface CardAvatarProps {
  avatarUrl: string;
  name: string;
  status: StatusBadgeProps['status'];
  email: string;
  phone: string;
  location: string;
  className?: string;
}

export const CardAvatar = ({
  avatarUrl,
  name,
  status,
  email,
  phone,
  location,
  className = ''
}: CardAvatarProps) => {
  return (
    <div className={`col-12 border-bottom w-100 mx-auto ${className}`}>
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row gap-3 align-items-start">
          <div className="flex-shrink-0">
            <img
              src={avatarUrl}
              alt={`${name}'s profile`}
              className="rounded-circle img-fluid"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
          </div>

          <div className="flex-grow-1 text-center text-md-start">
            <h4 className="mb-2 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-2">
              {name}
              <div className="ms-md-2 mt-2 mt-md-0">
                <StatusBadge status={status} theme={defaultStatusTheme} />
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
          </div>
        </div>
      </div>
    </div>
  );
};