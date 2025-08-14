import DoughnutChart from '../common/DoughnutChart';

interface TripTargetCardProps {
  title: string;
  currentAmount: number;
  targetAmount: number;
  primaryColor?: string;
  textColor?: string;
  backgroundColor?: string;
  size?: number;
  cutout?: string;
  animationDuration?: number;
  showTooltips?: boolean;
}

export default function TripTargetCard({
  title,
  currentAmount,
  targetAmount,
  primaryColor = "#7ac142",
  textColor = "#7ac142",
  backgroundColor = "#f0f2f4",
  size = 52,
  cutout = "80%",
  animationDuration = 1000,
  showTooltips = false
}: TripTargetCardProps) {
  // Calculate percentage based on current and target amounts
  const percentage = Math.round((currentAmount / targetAmount) * 100);

  // Format amounts for display
  const formatAmount = (amount: number): string => {
    if (amount >= 1000) {
      return `$${Math.round(amount / 1000)}K`;
    }
    return `$${amount}`;
  };

  return (
    <div className="col-12 col-md-6 col-xl-3 border">
      <div className="trip-card d-flex align-items-center justify-content-start gap-3">
        <DoughnutChart 
          percentage={percentage}
          primaryColor={primaryColor}
          textColor={textColor}
          backgroundColor={backgroundColor}
          size={size}
          cutout={cutout}
          animationDuration={animationDuration}
          showTooltips={showTooltips}
        />
        <div>
          <div className="trip-title">{title}</div>
          <div>
            <span className="trip-amount">{formatAmount(currentAmount)}</span>
            <span className="trip-total">/{formatAmount(targetAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
