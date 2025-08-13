import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import HorizontalBarChart from '../common/HorizontalBarChart';

export default function AgencyPerformanceSection() {
  const agencyData = [
    { name: 'Columbia Tours', subtitle: 'WE ASSIST', value: 9800 },
    { name: 'Palma & Company', subtitle: 'Infinity Transactional Ser...', value: 8900 },
    { name: 'PBC International', subtitle: 'WE ASSIST', value: 8500 },
    { name: 'Norman Ramos', subtitle: 'BEN-IN', value: 8400 },
    { name: 'Infinity Services', subtitle: 'Columbia Tours', value: 8300 },
    { name: 'DUV Internationls!', subtitle: 'WE ASSIST', value: 8000 },
  ];

  return (
    <div className="p-3 bg-white rounded-2 w-100">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <h1 className="p-0 m-0" style={{ fontSize: 14, fontWeight: 600 }}>
          Agency Performance
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
          <div style={{ fontSize: 13, fontWeight: 600, color: '#21272a' }}>
            $4.2K
          </div>
          <span style={{ fontSize: 12, color: '#4b647e' }}>
            Avg. Profit from Agency sales
          </span>
        </div>
      </div>
      <HorizontalBarChart
        id="agencyPerformanceChart"
        data={agencyData}
        backgroundColor="#4fc3f7"
        height={450}
        maxValue={10000}
        stepSize={2000}
      />
    </div>
  );
}
