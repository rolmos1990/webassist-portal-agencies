import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import CartBg from '../../assets/images/icons/cart-bg.png';
import type { GetDashboard200DataTopPlanesItem } from '../../api/schemas';

interface TopSellingPlansSectionProps {
  items?: GetDashboard200DataTopPlanesItem[];
}

export default function TopSellingPlansSection({ items = [] }: TopSellingPlansSectionProps) {
  const topPlans = items.slice(0, 3);

  return (
    <div className="p-3 bg-white rounded-2 w-100">
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="">
          <h1 className="p-0 m-0" style={{ fontSize: "14px", fontWeight: "600" }}>
            Top Selling Plans Per Program
          </h1>
          <p className="p-0 m-0 mt-1" style={{ color: "#4b647e", fontSize: "13px" }}>
            Top 3 selling plans across all programs
          </p>
        </div>
        <img src={LinkedIcon} alt="link-icon" />
      </div>
      {topPlans.length === 0 ? (
        <p className="p-0 m-0 mt-3" style={{ color: "#4b647e", fontSize: "13px" }}>
          No sales data available
        </p>
      ) : (
        <div className="d-flex flex-column flex-md-row mt-2 w-100 gap-3">
          {topPlans.map((plan, index) => (
            <div
              key={`${plan.plan ?? 'plan'}-${index}`}
              className="position-relative w-100"
              style={{ backgroundColor: "#012040", borderRadius: "8px" }}
            >
              <div className="selling-plan-card p-3 d-flex flex-column">
                <h1>{plan.plan}</h1>
                <h2>
                  {(plan.monto ?? 0).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </h2>
                <p>{plan.ventas ?? 0} Units Sold</p>
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
