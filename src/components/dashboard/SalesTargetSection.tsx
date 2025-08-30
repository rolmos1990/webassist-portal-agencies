import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import TripTargetCard from './TripTargetCard';

interface SalesTargetData {
  percentage: number;
  centerText?: string;
}

interface SalesTargetSectionProps {
  data: SalesTargetData;
}

export default function SalesTargetSection({ data }: SalesTargetSectionProps) {
  return (
    <div className="p-3 bg-white mx-3 rounded-2">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="">
          <h1
            className="p-0 m-0"
            style={{ fontSize: '14px', fontWeight: '600' }}
          >
            Sales Target Completion
          </h1>
          <p
            className="p-0 m-0 mt-1"
            style={{ color: '#4b647e', fontSize: '13px' }}
          >
            Track progress toward annual sales targets by program
          </p>
        </div>
        <img src={LinkedIcon} alt="link-icon" />
      </div>
      <div className="d-flex flex-column flex-xl-row gap-2 justify-content-start align-items-start w-100 mt-3">
        <div className="rounded-2 p-3 d-flex flex-column align-items-start justify-content-center top-sales-target bg-sales-target">
          <div className="d-flex w-100 justify-content-between align-items-center mb-2">
            <span style={{ fontWeight: '600' }}>Total Sales Target</span>
            <span style={{ fontWeight: '600' }}>{data.percentage}%</span>
          </div>
          <div className="progress w-100 mb-2 progress-sales-target">
            <div
              className="progress-bar progress-bar-sales-target"
              role="progressbar"
              aria-valuenow={data.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <div className="d-flex w-100 justify-content-between sales-target-labels">
            <span>0K</span>
            <span>100K</span>
          </div>
        </div>
        <div className="row w-100 ms-xl-2 mx-0">
          <TripTargetCard
            title="Short Trip"
            currentAmount={25000}
            targetAmount={30000}
          />
          <TripTargetCard
            title="Student Trip"
            currentAmount={29000}
            targetAmount={30000}
          />
          <TripTargetCard
            title="Yearly Multi Trip"
            currentAmount={19000}
            targetAmount={20000}
          />
          <TripTargetCard
            title="Long Stay Trips"
            currentAmount={7000}
            targetAmount={20000}
            primaryColor="#e74c3c"
            textColor="#e74c3c"
          />
        </div>
      </div>
    </div>
  );
}
