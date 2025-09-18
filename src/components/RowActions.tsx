import React, { createContext, useContext, useEffect, useId, useMemo, useRef } from "react";
import DropdownJS from "bootstrap/js/dist/dropdown";

type Align = "start" | "end";
type AutoClose = boolean | "inside" | "outside";

const RAContext = createContext<any>(undefined);
const useRAContext = <T,>() => useContext(RAContext) as T;

type RowActionsProps<T> = {
  context: T;
  children: React.ReactNode;
  align?: Align;
  minWidth?: number;
  className?: string;
  menuId?: string;
  autoClose?: AutoClose;          
  popperFixed?: boolean;        
};

function RowActionsRoot<T>({
  context,
  children,
  align = "end",
  minWidth = 200,
  className = "",
  menuId,
  autoClose = true,
  popperFixed = true,
}: RowActionsProps<T>) {
  const autoId = useId();
  const id = menuId ?? `row-actions-${autoId}`;
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<DropdownJS | null>(null);

  const popperConfig = useMemo(
    () =>
      popperFixed
        ? {
            strategy: "fixed" as const,
            modifiers: [{ name: "computeStyles", options: { adaptive: false } }],
          }
        : undefined,
    [popperFixed]
  );

  useEffect(() => {
    if (!btnRef.current) return;

    const instance =
      DropdownJS.getInstance(btnRef.current) ??
      new DropdownJS(btnRef.current, {
        autoClose,
        boundary: "viewport",
        popperConfig,
      });

    dropdownRef.current = instance;

    return () => {
      dropdownRef.current?.dispose();
      dropdownRef.current = null;
    };
  }, [autoClose, popperConfig]);

  const handleToggle = () => {
    dropdownRef.current?.toggle();
  };

  return (
    <RAContext.Provider value={context}>
      <div className="dropdown">
        <button
          ref={btnRef}
          type="button"
          className="btn btn-sm btn-link text-muted p-0"
          aria-expanded="false"
          aria-controls={id}
          onClick={handleToggle}
        >
          <i className="bi bi-three-dots-vertical fs-5" />
        </button>

        <div
          ref={menuRef}
          id={id}
          className={`dropdown-menu dropdown-menu-${align} shadow rounded-3 p-2 action-menu ${className}`}
          style={{ minWidth }}
          // Opcional: rol ARIA para accesibilidad
          role="menu"
        >
          {children}
        </div>
      </div>
    </RAContext.Provider>
  );
}

type ItemProps<T> = {
  icon?: React.ReactNode | string;
  children: React.ReactNode;
  danger?: boolean;
  onClick?: (ctx: T) => void;
};

function Item<T>({ icon, children, onClick, danger }: ItemProps<T>) {
  const ctx = useRAContext<T>();

  return (
    <button
      type="button"
      className={`dropdown-item d-flex align-items-center gap-2 rounded-2 ${
        danger ? "text-danger" : ""
      }`}
      onClick={() => onClick?.(ctx)}
      role="menuitem"
    >
      {typeof icon === "string" ? (
        <i className={`bi ${icon} ${danger ? "text-danger" : ""}`} />
      ) : (
        icon
      )}
      <span>{children}</span>
    </button>
  );
}

const Divider: React.FC = () => <div className="dropdown-divider my-2" role="separator" />;

const RowActions = Object.assign(RowActionsRoot, { Item, Divider });
export default RowActions;
