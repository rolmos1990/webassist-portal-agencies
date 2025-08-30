import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import HorizontalBarChart from '../common/HorizontalBarChart';

export interface AgentPerformanceData {
  name: string;
  subtitle: string;
  value: number;
}

interface AgentPerformanceSectionProps {
  data: {
    data: AgentPerformanceData[];
  };
}

export default function AgentPerformanceSection({ data = { data: [] } }: AgentPerformanceSectionProps) {

  return (
    <div className="p-3 bg-white rounded-2 w-100">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <h1 className="p-0 m-0" style={{ fontSize: 14, fontWeight: 600 }}>
          Agent Performance
        </h1>
        <img src={LinkedIcon} alt="link-icon" />
      </div>
      <div className="d-flex align-items-center gap-3 mt-3">
        <div className="">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#21272a' }}>
            $2172K
          </div>
          <span style={{ fontSize: 12, color: '#4b647e' }}>Total sales</span>
        </div>
        <div className="">
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#21272a' }}>
              $305K
            </div>
            <span style={{ fontSize: 12, color: '#4b647e' }}>
              Avg. Profit from Agent sales
            </span>
          </div>
        </div>
      </div>
      <HorizontalBarChart
        id="agentPerformanceChart"
        data={data.data || []}
        backgroundColor="#7cc249"
        height={450}
        maxValue={10000}
        stepSize={2000}
      />
    </div>
  );
}
