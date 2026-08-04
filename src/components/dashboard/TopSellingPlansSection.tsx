import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import CartBg from '../../assets/images/icons/cart-bg.png';

export interface TopSellingPlanItem {
  key: string;
  name: string;
  amount: string;
  unitsSoldText: string;
}

interface TopSellingPlansSectionLabels {
  title: string;
  subtitle: string;
  noData: string;
}

interface TopSellingPlansSectionProps {
  labels: TopSellingPlansSectionLabels;
  items: TopSellingPlanItem[];
}

export default function TopSellingPlansSection({ labels, items }: TopSellingPlansSectionProps) {
  return (
    <div className="p-3 bg-white rounded-2 w-100">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="">
          <h1 className="p-0 m-0" style={{ fontSize: "14px", fontWeight: "600" }}>
            {labels.title}
          </h1>
          <p className="p-0 m-0 mt-1" style={{ color: "#4b647e", fontSize: "13px" }}>
            {labels.subtitle}
          </p>
        </div>
        <img src={LinkedIcon} alt="link-icon" />
      </div>
      {items.length === 0 ? (
        <p className="p-0 m-0 mt-3" style={{ color: "#4b647e", fontSize: "13px" }}>
          {labels.noData}
        </p>
      ) : (
        <div className="d-flex flex-column flex-md-row mt-2 w-100 gap-3">
          {items.map((plan) => (
            <div
              key={plan.key}
              className="position-relative w-100"
              style={{ backgroundColor: "#012040", borderRadius: "8px" }}
            >
              <div className="selling-plan-card p-3 d-flex flex-column">
                <h1>{plan.name}</h1>
                <h2>{plan.amount}</h2>
                <p>{plan.unitsSoldText}</p>
              </div>
              <img
                src={CartBg}
                alt="bg"
                className="position-absolute"
                style={{ bottom: 0, right: 0 }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
