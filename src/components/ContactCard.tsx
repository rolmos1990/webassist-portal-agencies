// ContactCard.tsx
import React from "react";
import { UIButton } from "./Button";

type Icon = React.ReactNode;

type FieldItem = {
  icon?: Icon;
  content: React.ReactNode;
  ariaLabel?: string;
};

type ActionButton =
  | { label: string; icon?: Icon; onClick: () => void }

export interface ContactCardProps {
  name: string;
  photoUrl: string;
  status?: React.ReactNode;
  items?: FieldItem[];
  action?: ActionButton;
  className?: string;
}

export default function ContactCard({
  name,
  photoUrl,
  status,
  items = [],
  action,
  className = "",
}: ContactCardProps) {
  return (
    <div className={`card contact-card border rounded-4 h-100 ${className}`}>
      <div className="card-body py-3 px-3">
        <div className="row g-3">
          {/* Avatar arriba-izquierda */}
          <div className="col-auto">
            <img
              src={photoUrl}
              alt={`Photo of ${name}`}
              className="rounded-circle object-fit-cover shadow-0 contact-card__avatar"
              style={{ width: 48, height: 48 }}
            />
          </div>

          {/* Texto a la derecha */}
          <div className="col">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <h6 className="mb-0">{name}</h6>
              {status && <span className="ms-1">{status}</span>}
            </div>

            <ul className="list-unstyled mb-2 mt-2 small">
              {items.map((it, idx) => (
                <li key={idx} className="d-flex align-items-start gap-2 mb-1">
                  {it.icon && (
                    <span className="contact-card__icon text-success pt-1">{it.icon}</span>
                  )}
                  <span className="text-muted mx-1">{it.content}</span>
                </li>
              ))}
            </ul>

            {action && (
              <div className="pt-1">
                  <UIButton
                    type="button"
                    variant="link"
                    onClick={action.onClick}
                    className="text-decoration-none text-dark"
                  >
                    <span>{action.label}</span>
                    {action.icon ?? <i className="bi bi-arrow-right"></i>}
                  </UIButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
