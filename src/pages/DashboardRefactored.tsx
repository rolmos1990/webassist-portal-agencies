import {
  DashboardHeader,
  TopSellingPlansSection,
  KPIComparisonSection,
  QuotePerformanceSection,
  AgencyPerformanceSection
} from '../components/dashboard';

// Import refactored components
import SalesTargetSection from '../components/dashboard/SalesTargetSectionRefactored';
import RevenueRenewalsSection from '../components/dashboard/RevenueRenewalsSectionRefactored';
import CommissionEarnedSection from '../components/dashboard/CommissionEarnedSection';
import AgentPerformanceSection from '../components/dashboard/AgentPerformanceSectionRefactored';

import { useDashboardData } from '../hooks/useDashboardData';

function DashboardRefactored() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        <h4 className="alert-heading">Error loading dashboard data</h4>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="alert alert-warning m-3" role="alert">
        No dashboard data available
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />

      {/* Sales Target Section - Now receives data from API */}
      <SalesTargetSection data={data.salesTarget} />

      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        {/* Revenue Renewals Section - Now receives data from API */}
        <RevenueRenewalsSection data={data.revenueRenewals} />
        <TopSellingPlansSection />
      </div>
      
      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <KPIComparisonSection />
        {/* Commission Earned Section - Now receives data from API */}
        <CommissionEarnedSection data={data.commissionEarned} />
      </div>
      
      <QuotePerformanceSection />
      
      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        {/* Agent Performance Section - Now receives data from API */}
        <AgentPerformanceSection data={data.agentPerformance} />
        <AgencyPerformanceSection />
      </div>  
    </>
  );
}

export default DashboardRefactored;
