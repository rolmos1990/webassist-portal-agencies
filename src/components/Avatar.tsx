import { useState } from "react";

interface AvatarProps {
  /** URL de la imagen; si falta o no carga se muestran las iniciales */
  src?: string;
  name: string;
  size: number;
  className?: string;
}

// "Ramon Olmos" -> "RO": primera letra del primer y del último nombre
const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "—";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
};

export const Avatar = ({ src, name, size, className = "" }: AvatarProps) => {
  // Guarda la URL que falló para volver a intentar si cambia la imagen
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (src && src !== failedSrc) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-circle object-fit-cover flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
        onError={() => setFailedSrc(src)}
      />
    );
  }

  return (
    <div
      className={`rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center flex-shrink-0 fw-semibold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-label={name}
      role="img"
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
