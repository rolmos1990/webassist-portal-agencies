import React, { useEffect, useRef, useState } from "react";
import iconNotification from "../assets/images/icons/notification.svg";
import "../assets/scss/components/_notification-dropdown.scss";

export type NotificationItem = {
  id: string | number;
  title: string;
  message?: string;
  time: string;     // "2 mins ago", "Wed"
  unread?: boolean;
};

interface Props {
  items: NotificationItem[];
  onOpenAll?: () => void;
  onItemClick?: (item: NotificationItem, index: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  closeOnItemClick?: boolean; // default: true
}

export default function NotificationsDropdown({
  items,
  onOpenAll,
  onItemClick,
  closeOnItemClick = true,
}: Props) {
  const count = items.length;
  const [render, setRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const open = () => {
    setRender(true);
    requestAnimationFrame(() => setVisible(true));
  };
  const close = () => {
    setVisible(false);
    setTimeout(() => setRender(false), 160);
  };
  const toggle = () => (visible ? close() : open());

  useEffect(() => {
    if (!render) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [render]);

  useEffect(() => {
    if (!render) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [render]);

  const handleItemClick =
    (item: NotificationItem, index: number) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onItemClick?.(item, index, e);
      if (closeOnItemClick) close();
    };

  return (
    <div ref={rootRef} className="dropdown position-relative">
      {/* Botón campana */}
      <button
        type="button"
        className="btn btn-link p-0 position-relative"
        aria-expanded={visible}
        aria-label="Open notifications"
        onClick={toggle}
      >
        <img src={iconNotification} alt="Notifications" />
        {count > 0 && (
          <span
            className="position-absolute d-flex justify-content-center align-items-center"
            style={{
              top: -4,
              right: -6,
              width: 16,
              height: 16,
              backgroundColor: "brown",
              color: "#fff",
              borderRadius: 9999,
              fontSize: 10,
              lineHeight: 1,
              fontWeight: 600,
            }}
          >
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {/* Menú */}
      {render && (
        <div
          className={`dropdown-menu dropdown-menu-end notification-menu fade ${visible ? "show" : ""}`}
          role="menu"
          style={{ width: 320, right: 0, left: "auto" }}
        >
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <h6 className="mb-0 fw-semibold">
              Notifications{" "}
              <span className="badge bg-secondary-subtle text-secondary align-middle">
                {items.length}
              </span>
            </h6>
          </div>

          {/* Lista scrollable */}
          <div className="list-group list-group-flush" style={{ maxHeight: 380, overflowY: "auto" }}>
            {items.map((n, idx) => (
              <button
                key={n.id}
                type="button"
                onClick={handleItemClick(n, idx)}
                className="list-group-item list-group-item-action text-start px-3 py-3 bg-white border-0 border-bottom"
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-center">
                    <span
                      className={`${n.unread ? "bg-primary" : "bg-secondary-subtle"} me-2`}
                      style={{ width: 8, height: 8, borderRadius: 999 }}
                    />
                    <span className="fw-semibold">{n.title}</span>
                  </div>
                  <small className="text-muted ms-2 flex-shrink-0">{n.time}</small>
                </div>
                {n.message && <div className="text-muted small mt-1">{n.message}</div>}
              </button>
            ))}

            {items.length === 0 && (
              <div className="text-center text-muted small py-4">No notifications</div>
            )}
          </div>

          {/* Footer */}
          <div className="border-top text-center">
            <button
              type="button"
              className="btn btn-link text-decoration-none fw-semibold py-2"
              onClick={() => {
                onOpenAll?.();
                close();
              }}
            >
              See all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
