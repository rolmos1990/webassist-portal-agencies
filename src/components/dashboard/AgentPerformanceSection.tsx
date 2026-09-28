import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import HorizontalBarChart from '../common/HorizontalBarChart';
import { performanceScale } from './performanceScale';

export interface AgentPerformanceData {
  name: string;
  subtitle: string;
  value: number;
}

/** Props compartidas por las secciones de desempeño (agentes / agencias) */
export interface PerformanceSectionProps {
  labels: {
    title: string;
    totalSales: string;
    totalCommissions: string;
  };
  /** Montos ya formateados */
  totalSales: string;
  totalCommissions: string;
  items: AgentPerformanceData[];
}

export default function AgentPerformanceSection({ labels, totalSales, totalCommissions, items }: PerformanceSectionProps) {
  const { maxValue, stepSize } = performanceScale(items);

  return (
    <div className="p-3 bg-white rounded-2 w-100">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <h1 className="p-0 m-0" style={{ fontSize: 14, fontWeight: 600 }}>
          {labels.title}
        </h1>
        <img src={LinkedIcon} alt="link-icon" />
      </div>
      <div className="d-flex align-items-center gap-3 mt-3">
        <div className="">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#21272a' }}>
            {totalSales}
          </div>
          <span style={{ fontSize: 12, color: '#4b647e' }}>{labels.totalSales}</span>
        </div>
        <div className="">
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#21272a' }}>
              {totalCommissions}
            </div>
            <span style={{ fontSize: 12, color: '#4b647e' }}>
              {labels.totalCommissions}
            </span>
          </div>
        </div>
      </div>
      <HorizontalBarChart
        id="agentPerformanceChart"
        data={items}
        backgroundColor="#7cc249"
        height={450}
        maxValue={maxValue}
        stepSize={stepSize}
      />
    </div>
  );
}
