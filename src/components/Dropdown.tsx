import React, { useEffect, useRef, useState, type ReactNode } from "react";

type Align = "start" | "end";

type DropdownProps = {
  trigger: ReactNode;           // botón, avatar, ícono, etc.
  align?: Align;                // "start" | "end" (default: "end")
  className?: string;
  children: ReactNode;          // <DropdownItem/> y <DropdownDivider/>
};

export default function Dropdown({ trigger, align = "end", className = "", children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Anclar al trigger en lugar de a la columna padre
  const menuPosStyle: React.CSSProperties =
    align === "end" ? { right: 0, left: "auto" } : { left: 0, right: "auto" };

  return (
    <div ref={wrapperRef} className={`dropdown position-relative d-inline-block ${className}`}>
      <button
        type="button"
        className="btn p-0 border-0 bg-transparent"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((s) => !s)}
      >
        {trigger}
      </button>

      <ul
        role="menu"
        className={`dropdown-menu ${open ? "show" : ""}`}
        style={{ minWidth: 160, ...menuPosStyle }}
        onClick={() => setOpen(false)} // cerrar al seleccionar item
      >
        {children}
      </ul>
    </div>
  );
}

export function DropdownItem({
  onClick,
  className = "",
  children,
}: {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <li>
      <button type="button" className={`dropdown-item ${className}`} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}

export function DropdownDivider() {
  return (
    <li>
      <hr className="dropdown-divider" />
    </li>
  );
}
