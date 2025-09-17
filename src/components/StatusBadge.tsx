import React from "react";

type Tone = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";
type Variant = "soft" | "solid" | "outline";

export interface ThemeConfig {
  tone?: Tone;
  label?: React.ReactNode | ((status: string) => React.ReactNode);
  className?: string;
  showDot?: boolean;
  dotClassName?: string;
  bgClassName?: string;
  textClassName?: string;
  border?: boolean;
}

export type ThemeEntry = Tone | ThemeConfig;

export type StatusTheme = Record<string, ThemeEntry> & {
  default?: ThemeEntry;
};

export interface StatusBadgeProps {
  status: string;
  theme?: StatusTheme;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  /** toggle global para el puntito (por defecto true) */
  showDot?: boolean;
}

/* helper para clases */
const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

/** Normaliza la entrada del theme y entrega un objeto completo con defaults */
function resolveTheme(status: string, theme?: StatusTheme): Required<Omit<ThemeConfig, "label">> & {
  tone: Tone;
  label?: ThemeConfig["label"];
} {
  const raw: ThemeEntry =
    (theme && theme[status]) ??
    (theme && theme.default) ??
    ("secondary" as Tone);

  if (typeof raw === "string") {
    return {
      tone: raw,
      className: "",
      showDot: true,
      dotClassName: "",
      bgClassName: "",
      textClassName: "",
      border: true,
      label: undefined,
    };
  }

  return {
    tone: raw.tone ?? "secondary",
    className: raw.className ?? "",
    showDot: raw.showDot ?? true,
    dotClassName: raw.dotClassName ?? "",
    bgClassName: raw.bgClassName ?? "",
    textClassName: raw.textClassName ?? "",
    border: raw.border ?? true,
    label: raw.label,
  };
}

/** Clases base por variante */
function classesFor(tone: Tone, variant: Variant) {
  switch (variant) {
    case "solid":
      return {
        bg: `bg-${tone}`,
        text: "text-white",
        border: "border-0",
        dot: "bg-white",
      };
    case "outline":
      return {
        bg: "bg-transparent",
        text: `text-${tone}`,
        border: `border border-${tone}`,
        dot: `bg-${tone}`,
      };
    default: // "soft"
      return {
        bg: "bg-light",
        text: `text-${tone}`,
        border: "border",
        dot: `bg-${tone}`,
      };
  }
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  theme,
  variant = "soft",
  size = "md",
  className = "",
  showDot = true, // global toggle
}) => {
  const cfg = resolveTheme(status, theme);
  const base = classesFor(cfg.tone, variant);

  const label =
    typeof cfg.label === "function" ? cfg.label(status) : (cfg.label ?? status);

  const dotSize = size === "sm" ? 6 : 8;
  const pad = size === "sm" ? "py-1 px-2" : "py-1 px-3";
  const font = size === "sm" ? "fw-medium small" : "fw-medium";

  return (
    <span
      className={cx(
        "badge rounded-pill d-inline-flex align-items-center gap-1",
        pad,
        font,
        cfg.border && base.border,
        cfg.bgClassName || base.bg,
        cfg.textClassName || base.text,
        cfg.className,
        className
      )}
      style={{ fontWeight: 500 }}
    >
      {showDot && cfg.showDot && (
        <span
          className={cx("rounded-circle", cfg.dotClassName || base.dot)}
          style={{ width: dotSize, height: dotSize }}
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
};
