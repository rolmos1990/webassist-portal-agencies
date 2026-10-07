/**
 * Tarjeta de resumen por plan (SILVER, GOLD, ...) dentro de un programa.
 * Sólo UI: todavía no hay API que la alimente, por eso su uso está comentado en ProgramsPerformance.
 */
export interface ProgramPlanCardProps {
  name: string;
  /** Filas etiqueta/valor ya traducidas y formateadas */
  rows: { label: string; value: string }[];
}

export default function ProgramPlanCard({ name, rows }: ProgramPlanCardProps) {
  return (
    <div className="p-4 bg-white rounded-2 h-100">
      <div
        className="d-flex align-items-center justify-content-center rounded-circle"
        style={{ width: 48, height: 48, backgroundColor: '#e8f5dc', color: '#7cc249', fontSize: 20 }}
      >
        <i className="bi bi-suitcase2"></i>
      </div>
      <h2 className="p-0 m-0 mt-4" style={{ fontSize: 15, fontWeight: 600, color: '#21272a' }}>
        {name}
      </h2>
      <div className="mt-3 d-flex flex-column gap-2">
        {rows.map((row) => (
          <div key={row.label} className="d-flex justify-content-between gap-3">
            <span style={{ fontSize: 13, color: '#4b647e' }}>{row.label}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#21272a' }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
