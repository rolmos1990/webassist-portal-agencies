import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
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
import CreateAgenciesVertical from '../components/Forms/CreateAgenciesVertical';
import FilterByAgencyForm from '../components/Forms/FilterByAgencyForm';
import Offcanvas from '../components/Offcanvas';
import { useDashboardData } from '../hooks/useDashboardData';
import { useState } from 'react';

function Dashboard() {
  const { data, loading, error } = useDashboardData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (data: any) => {
    console.log(data);
    handleClose();
  };

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
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-3 px-4">
    <Breadcrumb title="Dashboard" description="Monitor key performance of Product and Agency sales" 
    rightContent={
      <div className="d-flex gap-2">
        <UIButton variant="outline-primary" icon=""  onClick={handleShow}>
          Filter By
        </UIButton>
        <UIButton variant="outline-primary" icon="">
          This year
        </UIButton>
      </div>
    }
    />

      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        title="Filter By Agency"
        canClose={true}
        scroll={true}
        backdrop="static"
        width="380px"
        keyboard={true}
      >
        <FilterByAgencyForm onSubmit={handleSubmit} onCancel={handleClose} />
        </Offcanvas>

      <SalesTargetSection data={data.salesTarget} />

      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <RevenueRenewalsSection data={data.revenueRenewals} />
        <TopSellingPlansSection />
      </div>
      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <KPIComparisonSection />
        <CommissionEarnedSection data={data.commissionEarned} />
      </div>
      <QuotePerformanceSection />
      <div className="d-flex p-3 flex-column flex-xl-row gap-3">
        <AgentPerformanceSection data={data.agentPerformance} />
        <AgencyPerformanceSection />
      </div>  
      </div>
    </div>
  );
}

export default Dashboard;