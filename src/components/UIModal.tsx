import React, { useEffect, useRef, useState, useCallback } from "react";

type StatusIcon = "success" | "error" | "warning" | "info";

interface UIModalProps {
  show: boolean;               // controla visibilidad
  onClose: () => void;
  title?: React.ReactNode;     // grande en el body
  subtitle?: React.ReactNode;  // texto secundario
  icon?: StatusIcon | React.ReactNode;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  backdrop?: true | false | "static"; // true = cierra al hacer click fuera
  keyboard?: boolean;          // cerrar con ESC
  className?: string;
}

const CircleStatusIcon: React.FC<{ kind: StatusIcon }> = ({ kind }) => {
  const bg =
    kind === "success" ? "var(--bs-success)" :
    kind === "error"   ? "var(--bs-danger)"  :
    kind === "warning" ? "var(--bs-warning)" : "var(--bs-info)";

  const mark =
    kind === "success" ? (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 13.5l5 5L20 6.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : kind === "error" ? (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 7l10 10M17 7L7 17" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ) : kind === "warning" ? (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 7v6M12 17.5h.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 17v-5M12 7h.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    );

  return (
    <div className="d-inline-flex align-items-center justify-content-center"
         style={{ width: 56, height: 56, borderRadius: 9999, background: bg, boxShadow: "0 2px 6px rgba(0,0,0,.1)" }}>
      {mark}
    </div>
  );
};

const UIModal: React.FC<UIModalProps> = ({
  show,
  onClose,
  title,
  subtitle,
  icon = "success",
  primaryLabel,
  onPrimaryClick,
  backdrop = true,
  keyboard = true,
  className = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Estados para manejar el fade-in/out sin desmontar de inmediato
  const [render, setRender] = useState(show);
  const [visible, setVisible] = useState(show);

  // Montaje/desmontaje con animación (150ms = duración Bootstrap)
  useEffect(() => {
    if (show) {
      setRender(true);
      requestAnimationFrame(() => setVisible(true)); // activa fade-in
    } else {
      setVisible(false); // activa fade-out
      const t = setTimeout(() => setRender(false), 150);
      return () => clearTimeout(t);
    }
  }, [show]);

  // Cerrar con ESC (si keyboard)
  useEffect(() => {
    if (!render || !keyboard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [render, keyboard, onClose]);

  // Click en backdrop (si backdrop !== "static" y !== false)
  const onBackdropMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!backdrop || backdrop === "static") return;
      if (e.target === wrapperRef.current) onClose();
    },
    [backdrop, onClose]
  );

  if (!render) return null;

  const renderIcon = () =>
    typeof icon === "string" ? <CircleStatusIcon kind={icon as StatusIcon} /> : icon;

  return (
    <>
      {/* Backdrop controlado por React, con animación fade */}
      {backdrop && (
        <div
          className={`modal-backdrop fade ${visible ? "show" : ""}`}
          // el backdrop no intercepta el click para permitir handler en wrapper
          style={{ display: "block" }}
        />
      )}

      {/* Modal wrapper (el que detecta backdrop click) */}
      <div
        ref={wrapperRef}
        className={`modal fade ${visible ? "show" : ""} ${className ?? ""}`}
        style={{ display: "block" }}
        role="dialog"
        aria-modal="true"
        onMouseDown={onBackdropMouseDown}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 rounded-4 position-relative">
            {/* X flotante arriba derecha (clickeable) */}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="btn btn-link text-muted position-absolute"
              style={{ right: 12, top: 12, zIndex: 2, padding: 8, background: "transparent", lineHeight: 1 }}
            >
              <i className="bi bi-x-lg" />
            </button>

            <div className="modal-body text-center py-4">
              <div className="mb-3">{renderIcon()}</div>

              {title && (
                <h5 className="mb-1 fw-semibold" style={{ color: "var(--bs-black)" }}>
                  {title}
                </h5>
              )}

              {subtitle && (
                <p className="mb-3 text-muted" style={{ fontSize: 14 }}>
                  {subtitle}
                </p>
              )}

              {primaryLabel && (
                <button
                  type="button"
                  onClick={onPrimaryClick}
                  className="btn rounded-pill px-5 py-2 my-3 fw-semibold"
                  style={{ background: "#06b6d4", borderColor: "#06b6d4", color: "#fff" }}
                >
                  {primaryLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UIModal;