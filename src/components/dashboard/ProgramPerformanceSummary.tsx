import { useState } from 'react';
import type { GetDashboard200DataProgramsPerformanceItem, ProgramPerformancePeriodo } from '../../api/schemas';

/** Periodos del contrato: YTD (ytd), MOM (mes_actual), YOY (ano_anterior) */
export type ProgramPeriod = 'ytd' | 'mes_actual' | 'ano_anterior';

const PERIODS: ProgramPeriod[] = ['ytd', 'mes_actual', 'ano_anterior'];

type MetricField = keyof ProgramPerformancePeriodo;

export interface ProgramPerformanceMetric {
  key: string;
  field: MetricField;
  title: string;
  format: (value: number) => string;
}

interface ProgramPerformanceSummaryProps {
  program: GetDashboard200DataProgramsPerformanceItem;
  metrics: ProgramPerformanceMetric[];
  periodLabels: Record<ProgramPeriod, string>;
}

function MetricBlock({
  program,
  metric,
  periodLabels,
  isLast,
}: {
  program: GetDashboard200DataProgramsPerformanceItem;
  metric: ProgramPerformanceMetric;
  periodLabels: Record<ProgramPeriod, string>;
  isLast: boolean;
}) {
  const [period, setPeriod] = useState<ProgramPeriod>('ytd');
  const value = program[period]?.[metric.field] ?? 0;

  return (
    <div
      className="col-12 col-md-6 col-xl-3 py-2 px-3"
      style={{ borderRight: isLast ? undefined : '1px solid #e6eaee' }}
    >
      <p className="p-0 m-0" style={{ fontSize: 13, color: '#4b647e' }}>
        {metric.title}
      </p>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className="btn btn-sm"
            style={{
              borderRadius: 18,
              fontSize: 12,
              fontWeight: 500,
              minWidth: 56,
              border: `1px solid ${period === p ? '#4fc3f7' : '#dde1e6'}`,
              color: period === p ? '#0b8fc4' : '#21272a',
              backgroundColor: 'transparent',
            }}
          >
            {periodLabels[p]}
          </button>
        ))}
      </div>
      <div className="mt-3" style={{ fontSize: 18, fontWeight: 600, color: '#21272a' }}>
        {metric.format(value)}
      </div>
    </div>
  );
}

export default function ProgramPerformanceSummary({ program, metrics, periodLabels }: ProgramPerformanceSummaryProps) {
  return (
    <div className="p-3 bg-white rounded-2 w-100">
      <div className="row g-0">
        {metrics.map((metric, index) => (
          // key incluye el programa para reiniciar el periodo al cambiar de tab
          <MetricBlock
            key={`${program.id ?? program.nombre}-${metric.key}`}
            program={program}
            metric={metric}
            periodLabels={periodLabels}
            isLast={index === metrics.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
