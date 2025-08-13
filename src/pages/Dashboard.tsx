import {
  DashboardHeader,
  SalesTargetSection,
  RevenueRenewalsSection,
  TopSellingPlansSection,
  KPIComparisonSection,
  CommissionEarnedSection,
  QuotePerformanceSection,
  AgentPerformanceSection,
  AgencyPerformanceSection
} from '../components/dashboard';

function Dashboard() {
  return (
    <>
      <DashboardHeader />

      <SalesTargetSection />

      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <RevenueRenewalsSection />
        <TopSellingPlansSection />
      </div>
      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <KPIComparisonSection />
        <CommissionEarnedSection />
      </div>
      <QuotePerformanceSection />
      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <AgentPerformanceSection />
        <AgencyPerformanceSection />
      </div>  
    </>)
}

export default Dashboard;