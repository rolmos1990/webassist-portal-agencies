import React, { createContext, useContext, useId } from "react";

type Align = "start" | "end";

const RAContext = createContext<any>(undefined);
const useRAContext = <T,>() => useContext(RAContext) as T;

type RowActionsProps<T> = {
  context: T;
  children: React.ReactNode;
  align?: Align;
  minWidth?: number;
  className?: string;
  menuId?: string;
};

function RowActionsRoot<T>({
  context,
  children,
  align = "end",
  minWidth = 200,
  className = "",
  menuId,
}: RowActionsProps<T>) {
  const autoId = useId();
  const id = menuId ?? `row-actions-${autoId}`;

  return (
    <RAContext.Provider value={context}>
      <div className="dropdown">
        <button
          type="button"
          className="btn btn-sm btn-link text-muted p-0"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-controls={id}
        >
          <i className="bi bi-three-dots-vertical fs-5" />
        </button>

        <div
          id={id}
          className={`dropdown-menu dropdown-menu-${align} shadow rounded-3 p-2 action-menu ${className}`}
          style={{ minWidth }}
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

const Divider: React.FC = () => <div className="dropdown-divider my-2" />;

const RowActions = Object.assign(RowActionsRoot, { Item, Divider });
export default RowActions;