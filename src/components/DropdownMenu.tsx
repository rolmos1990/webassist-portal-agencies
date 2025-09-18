import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Align = "start" | "end";

type DropdownContextType = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  menuId: string;
  triggerRef: React.RefObject<HTMLButtonElement | HTMLDivElement>;
  menuRef: React.RefObject<HTMLUListElement>;
  align: Align;
  closeOnItemClick: boolean;
};

const DropdownCtx = createContext<DropdownContextType | null>(null);
const useDropdown = () => {
  const ctx = useContext(DropdownCtx);
  if (!ctx) throw new Error("Dropdown components must be used inside <Dropdown>");
  return ctx;
};

type DropdownProps = {
  children: React.ReactNode;
  align?: Align;                 // "start" (default) | "end"
  closeOnItemClick?: boolean;    // default: true
  className?: string;
};

export function Dropdown({ children, align = "end", closeOnItemClick = true, className = "" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const menuId = useRef(`ddm-${Math.random().toString(36).slice(2)}`).current;
  const triggerRef = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const toggle = useCallback(() => setOpen(o => !o), []);
  const close = useCallback(() => setOpen(false), []);

  // Cerrar con click fuera
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current || !menuRef.current) return;
      if (!triggerRef.current.contains(t) && !menuRef.current.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Posicionamiento: aseguramos inline-block para que `dropdown-menu-end` se alinee al trigger
  const wrapperClass = `dropdown d-inline-block position-relative ${className}`;

  return (
    <DropdownCtx.Provider value={{ open, toggle, close, menuId, triggerRef, menuRef, align, closeOnItemClick }}>
      <div className={wrapperClass}>{children}</div>
    </DropdownCtx.Provider>
  );
}

// Trigger: puede ser un <button> o cualquier nodo; aquí usamos button por accesibilidad
type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asDiv?: boolean; // si quieres envolver contenido no clickable y manejar estilos tú
};
Dropdown.Trigger = function Trigger({ children, asDiv = false, ...btnProps }: TriggerProps) {
  const { open, toggle, menuId, triggerRef } = useDropdown();
  if (asDiv) {
    return (
      <div ref={triggerRef as React.RefObject<HTMLDivElement>} onClick={toggle} aria-haspopup="menu" aria-expanded={open} aria-controls={menuId} style={{ cursor: "pointer" }}>
        {children}
      </div>
    );
  }
  return (
    <button
      type="button"
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      onClick={toggle}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      className={`btn p-0 border-0 bg-transparent ${btnProps.className ?? ""}`}
      {...btnProps}
    >
      {children}
    </button>
  );
};

type MenuProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};
Dropdown.Menu = function Menu({ children, className = "", style }: MenuProps) {
  const { open, menuId, menuRef, align } = useDropdown();
  const alignClass = align === "end" ? "dropdown-menu-end" : "";
  return (
    <ul
      id={menuId}
      ref={menuRef}
      role="menu"
      className={`dropdown-menu ${alignClass} ${open ? "show" : ""} ${className}`}
      style={{ minWidth: 160, ...style }}
    >
      {children}
    </ul>
  );
};

type ItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  as?: "button" | "a"; // si alguna vez quieres <a> (no SPA)
};
Dropdown.Item = function Item({ children, onClick, className = "", as = "button" }: ItemProps) {
  const { close, closeOnItemClick } = useDropdown();
  const handle = () => {
    onClick?.();
    if (closeOnItemClick) close();
  };

  if (as === "a") {
    return (
      <li>
        <a className={`dropdown-item ${className}`} onClick={handle}>
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <button type="button" className={`dropdown-item ${className}`} onClick={handle}>
        {children}
      </button>
    </li>
  );
};

Dropdown.Divider = function Divider() {
  return (
    <li>
      <hr className="dropdown-divider" />
    </li>
  );
};