import { useEffect, useState, useRef } from "react";
import { toast, type ToastType } from "../../services/toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Toast as BSToast } from "bootstrap";

type ToastMsg = { id: number; type: ToastType; title: string; message?: string };

export default function ToastProvider() {
  const [messages, setMessages] = useState<ToastMsg[]>([]);
  const instancesRef = useRef<Map<number, BSToast>>(new Map());

  useEffect(() => {
    toast.register((type, title, message) => {
      const id = Date.now() + Math.random();
      setMessages(prev => [...prev, { id, type, title, message }]);
    });
    return () => toast.unregister?.();
  }, []);

  const getHeaderClass = (type: ToastType) => ({
    success: "bg-success text-white",
    error: "bg-danger text-white",
    warning: "bg-warning",
    info: "bg-info text-white",
  }[type]);

  const getIcon = (type: ToastType) => ({
    success: "bi bi-check-circle-fill",
    error: "bi bi-x-circle-fill",
    warning: "bi bi-exclamation-triangle-fill",
    info: "bi bi-info-circle-fill",
  }[type]);

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      {messages.map((t) => (
        <div
          key={t.id}
          className="toast fade hide shadow border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ minWidth: "320px" }}
          data-id={t.id}
          ref={(el) => {
            if (!el || instancesRef.current.has(t.id)) return;

            const instance = BSToast.getOrCreateInstance(el, {
              autohide: true,
              delay: 4000,
            });

            el.addEventListener("hidden.bs.toast", () => {
              instancesRef.current.delete(t.id);
              setMessages(prev => prev.filter(m => m.id !== t.id));
            });

            instance.show();
            instancesRef.current.set(t.id, instance);
          }}
        >
          <div className={`toast-header ${getHeaderClass(t.type)}`}>
            <i className={`${getIcon(t.type)} me-2`} />
            <strong className="me-auto">{t.title}</strong>
            <button
              className="btn-close btn-close-white ms-2 mb-1"
              data-bs-dismiss="toast"
              aria-label="Close"
            />
          </div>
          {t.message && <div className="toast-body">{t.message}</div>}
        </div>
      ))}
    </div>
  );
}
