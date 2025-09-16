import React from "react";

type IconProp = string | React.ReactNode;
type IconPosition = "left" | "right";
type Size = "sm" | "md" | "lg";

// Agrega aquí nuevos estilos (solo clases Bootstrap)
const BUTTON_STYLES = {
  primary: "btn btn-primary",
  "outline-primary": "btn btn-outline-primary bg-white",
  secondary: "btn btn-secondary",
  "outline-secondary": "btn btn-outline-secondary bg-white",
  success: "btn btn-success",
  "outline-success": "btn btn-outline-success bg-white",
  info: "btn btn-info",
  "outline-info": "btn btn-outline-info bg-white",
  danger: "btn btn-danger",
  "outline-danger": "btn btn-outline-danger bg-white",
  link: "btn btn-link",
  dark: "btn btn-outline-primary bg-primary text-dark rounded-pill fn-semibold",
} as const;

export type ButtonVariant = keyof typeof BUTTON_STYLES;

export interface UIButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  pill?: boolean;
  icon?: IconProp; // p.ej. "bi bi-download" o <SomeIcon />
  iconPosition?: IconPosition;
  className?: string;
}

const cx = (...parts: Array<string | undefined | false>) =>
  parts.filter(Boolean).join(" ");

const Icon = ({
  icon,
  pos,
}: {
  icon?: IconProp;
  pos: IconPosition;
}) => {
  if (!icon) return null;
  const node =
    typeof icon === "string" ? (
      <i className={icon} aria-hidden="true" />
    ) : (
      icon
    );
  return <span className={pos === "left" ? "me-2" : "ms-2"}>{node}</span>;
};

export const UIButton: React.FC<UIButtonProps> = ({
  children,
  variant = "outline-primary",
  size = "md",
  pill = true,
  icon,
  iconPosition = "left",
  className = "",
  type = "button",
  ...props
}) => {
  const sizeClass =
    size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : undefined;

  const classes = cx(
    BUTTON_STYLES[variant] ?? BUTTON_STYLES["outline-primary"],
    pill && "rounded-pill",
    sizeClass,
    className
  );

  return (
    <button type={type} className={classes} {...props}>
      {iconPosition === "left" && <Icon icon={icon} pos="left" />}
      {children}
      {iconPosition === "right" && <Icon icon={icon} pos="right" />}
    </button>
  );
};
