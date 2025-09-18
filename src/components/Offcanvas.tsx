import { useEffect, useRef } from 'react';
import OffcanvasJS from 'bootstrap/js/dist/offcanvas';

type Placement = 'start' | 'end' | 'top' | 'bottom';

interface OffcanvasProps {
  show: boolean;
  onHide: () => void;
  onShow?: () => void;
  placement?: Placement;
  children: React.ReactNode;
  backdrop?: boolean | 'static';
  scroll?: boolean;
  keyboard?: boolean;
  className?: string;
  title?: string;
  width?: string;
  canClose?: boolean;
  id?: string;
}

export default function Offcanvas({
  show,
  onHide,
  onShow,
  placement = 'end',
  children,
  backdrop = 'static',
  scroll = false,
  keyboard = true,
  className = '',
  title = '',
  width = '400px',
  canClose = true,
  id = 'app-offcanvas',
}: OffcanvasProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const instance = OffcanvasJS.getOrCreateInstance(el, {
      backdrop,
      scroll,
      keyboard,
    });

    const handleShown = () => onShow?.();
    const handleHidden = () => onHide();

    el.addEventListener('shown.bs.offcanvas', handleShown);
    el.addEventListener('hidden.bs.offcanvas', handleHidden);

    if (show) instance.show();
    else instance.hide();

    return () => {
      el.removeEventListener('shown.bs.offcanvas', handleShown);
      el.removeEventListener('hidden.bs.offcanvas', handleHidden);
    };
  }, [show, backdrop, scroll, keyboard, onHide, onShow]);

  return (
    <div
      ref={ref}
      id={id}
      className={`offcanvas offcanvas-${placement} ${className}`}
      tabIndex={-1}
      style={{ width }}
    >
      <div className="offcanvas-header border-bottom">
        {title && <h5 className="offcanvas-title">{title}</h5>}
        {canClose && (
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        )}
      </div>
      <div className="offcanvas-body" style={{ overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
