import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import HorizontalBarChart from '../common/HorizontalBarChart';

export default function AgentPerformanceSection() {
  const agentData = [
    { name: 'Leslie King', subtitle: 'WE ASSIST', value: 9800 },
    { name: 'Bertha Walters', subtitle: 'Infinity Transactional Ser...', value: 8900 },
    { name: 'Heidi Jordan', subtitle: 'Palma & Company', value: 8500 },
    { name: 'Norman Ramos', subtitle: 'BEN-IN', value: 8400 },
    { name: 'Sylvia Burton', subtitle: 'Columbia Tours', value: 8300 },
    { name: 'Tracey Ford', subtitle: 'PBC INTERNATIONAL', value: 8000 },
  ];

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
        data={agentData}
        backgroundColor="#7cc249"
        height={450}
        maxValue={10000}
        stepSize={2000}
      />
    </div>
  );
}
