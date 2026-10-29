/**
 * Tarjeta de resumen por plan (SILVER, GOLD, ...) dentro de un programa.
 * Se alimenta de datos_planes[].planes del dashboard (ver ProgramsPerformance).
 */
export interface ProgramPlanCardProps {
  name: string;
  /** Filas etiqueta/valor ya traducidas y formateadas */
  rows: { label: string; value: string }[];
}

export default function ProgramPlanCard({ name, rows }: ProgramPlanCardProps) {
  return (
    <div className="bg-white h-100" style={{ borderRadius: 12, padding: '28px 28px 24px' }}>
      <div
        className="d-flex align-items-center justify-content-center rounded-circle"
        style={{ width: 52, height: 52, backgroundColor: '#edf7e6', color: '#6dbb3a' }}
      >
        {/* Maleta del diseño (asa, dos franjas y ruedas) en SVG para que se vea nítida */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9.5 6V3.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75V6" />
          <rect x="6.5" y="6" width="11" height="13" rx="2" />
          <path d="M10 9.5v6M14 9.5v6" />
          <path d="M9 19v1.5M15 19v1.5" />
        </svg>
      </div>
      {/* Sin m-0: su !important anularía el marginTop */}
      <h2 className="p-0 mb-0" style={{ marginTop: 24, fontSize: 16, fontWeight: 600, color: '#21272a', letterSpacing: 0.2 }}>
        {name}
      </h2>
      {/* Dos columnas: etiqueta a la izquierda y valores alineados entre sí (no pegados al borde) */}
      <div
        className="mt-3"
        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', columnGap: 24, rowGap: 12, alignItems: 'baseline' }}
      >
        {rows.map((row) => (
          <div key={row.label} style={{ display: 'contents' }}>
            <span style={{ fontSize: 14, color: '#4b647e' }}>{row.label}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#21272a', whiteSpace: 'nowrap', paddingRight: 32 }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
