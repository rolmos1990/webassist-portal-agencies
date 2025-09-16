import type { ReactNode } from 'react';
import { Offcanvas as BootstrapOffcanvas } from 'react-bootstrap';

type Placement = 'start' | 'end' | 'top' | 'bottom';

interface OffcanvasProps {
  show: boolean;
  onHide: () => void;
  onShow?: () => void;
  placement?: Placement;
  children: ReactNode;
  backdrop?: boolean | 'static';
  scroll?: boolean;
  keyboard?: boolean;
  className?: string;
  title?: string;
  width?: string;
  canClose?: boolean;
}

const Offcanvas = ({
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
}: OffcanvasProps) => {
  return (
    <BootstrapOffcanvas
      show={show}
      onHide={onHide}
      onShow={onShow}
      placement={placement}
      backdrop={backdrop}
      scroll={scroll}
      keyboard={keyboard}
      className={className}
      style={{ width }}
    >
      <BootstrapOffcanvas.Header
        closeButton={canClose}
        className="border-bottom"
      >
        {title && (
          <BootstrapOffcanvas.Title as="h5">
            {title}
          </BootstrapOffcanvas.Title>
        )}
      </BootstrapOffcanvas.Header>

      <BootstrapOffcanvas.Body className="no-scrollbar" style={{ overflowY: 'auto' }}>
        {children}
      </BootstrapOffcanvas.Body>
    </BootstrapOffcanvas>
  );
};

export default Offcanvas;
