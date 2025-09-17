import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import CustomerCard from '../components/CustomerCard';
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { StatusBadge } from '../components/StatusBadge';
import Offcanvas from '../components/Offcanvas';
import { BenefitsExample } from '../examples/BenefitsExample';
import { defaultStatusTheme } from '../components/StatusBadge/StatusBadgeThemes';

export default function PlanDetail() {
    const [show, setShow] = useState(false);

    const noContent = <div className="border rounded-4 p-4 text-muted">
                        No standing quotes yet.
                      </div>;                        

    return (
<div className="min-vh-100 bg-light">
  <div className="container-fluid py-3 px-4">
        <Breadcrumb title="Back" hasBack rightContent={
          <div className="d-flex gap-2">
        <UIButton
        variant="outline-primary"
        icon="bi bi-envelope"
        >
        Resend the Voucher
        </UIButton>
        <UIButton
        variant="outline-primary"
        icon="bi bi-pencil"
        >
        Modify Voucher Data
        </UIButton>
          </div>
        } />
        <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"        // start | end | top | bottom
        title="Benefits per person"
        canClose={true}
        scroll={true}
        backdrop="static"      // true | false | 'static'
        width="380px"
      >
        <div className="container-fluid">
        <ul className="list-group list-group-flush">
        <div className="d-flex align-items-center justify-content-between mb-2">
        {/* El botón de cierre normalmente ya viene en el header del Offcanvas */}
      </div>
        {BenefitsExample().map((item, idx) => (
          <li
            key={idx}
            className="list-group-item px-0 py-2"
          >
            <div className="row g-2 align-items-start">
              <div className="col-8 d-flex">
              <span
  className="badge rounded-circle bg-success d-inline-flex align-items-center justify-content-center me-2"
  style={{ width: "20px", height: "20px" }}
>
  <i className="bi bi-info"></i>
</span>
                <span className="fw-normal small">{item.label}</span>
              </div>
              <div className="col-4 text-end">
                <div className="fw-semibold small">{item.value}/</div>
                <div className="fw-semibold small ms-1">EUR 35,000</div>
        </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
      </Offcanvas>
        <div className="card shadow">
            <div className="p-4">
            <div className="row g-3 align-items-md-center border-bottom pb-3">

            <div className="col">
                <h4 className="mb-2 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start gap-2">
              A93-E2B5K9
              <div className="ms-md-2 mt-2 mt-md-0">
                <StatusBadge status={"Active"} theme={defaultStatusTheme} />
              </div>
            </h4>
        

            <p className="mb-1 text-black pb-1">
              Travel Trips per day <b>GOLD</b>
            </p>
            <p className="mb-1 text-gray small pb-1">
              USD 100 - 4 Traveller (s) 
            </p>
            <button
  type="button"
  onClick={() => setShow(true)}
  className="btn btn-link text-decoration-none text-primary p-0"
>
  More details
</button>
            </div>
             {/* Derecha: botones */}
             <div className="col-12 col-md-auto d-flex align-items-center justify-content-center justify-content-md-end gap-2 ms-md-auto">
             <UIButton variant="dark" size="sm" pill>
            Re Purchase
            </UIButton>
            <UIButton variant="dark" size="sm" pill icon="bi bi-file-earmark-arrow-down">
            Download Voucher
            </UIButton>
            </div>
          </div>
                <div className="flex-grow-1 border-bottom pb-3">
                                    <HorizontalCardList desktopCols={6}>
                                    <HorizontalCardListItem 
                                        title="Issue Date"
                                        value={"08 Sep 2024"}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem 
                                        title="Origin"
                                        value={<span className="d-inline-flex align-items-center">
                                                    <i className="bi bi-geo-alt me-2 text-success" />
                                                    Panama
                                                </span>}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem 
                                        title="Destination"
                                        value={<span className="d-inline-flex align-items-center">
                                                    <i className="bi bi-geo-alt me-2 text-success" />
                                                    United States
                                                </span>}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem 
                                        title="Exit"
                                        value={<span className="d-inline-flex align-items-center">
                                                    <i className="bi bi-calendar3 me-2 text-success" />
                                                    12 Dec 2025
                                                </span>}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem 
                                        title="Return"
                                        value={<span className="d-inline-flex align-items-center">
                                                    <i className="bi bi-calendar3 me-2 text-success" />
                                                    20 Dec 2025
                                                </span>}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem 
                                        title="Reference"
                                        value={"22815"}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem 
                                        title="Payment Confirmation"
                                        value={<span className="d-inline-flex align-items-center">
                                                    <i className="bi bi-calendar3 me-2 text-success" />
                                                    Credit Card (STS-GOSATWUGF9F)
                                                </span>}
                                        icon={""}
                                      />
                                    </HorizontalCardList>
                </div>
                <div className="mt-4">
                    <h5 className="mb-4">Traveler(s)</h5>
                    <div className="row">
                        <div className="col-12 col-md-5">
                            <CustomerCard
                                name="Iris Mabel Tejeira Diaz"
                                gender="Male"
                                idNumber="12345678"
                                amount={1234.56}
                                dob="24/12/1975"
                                phone="+50768934567"
                                email="matoectl@mail.com"
                                medicalTitle="Medical condition or Pre existing Condition"
                                medicalDetails="Controlled hypertension, Cancer Controlled, good standing letter is maintained health by family doctor"
                                onViewCard={() => {}}
                                onViewCertification={() => {}}
                                currency="USD"
                            />
                        </div>
                        <div className="col-12 col-md-5">
                            <CustomerCard
                                name="Tejeira Diaz"
                                gender="Female"
                                idNumber="12345678"
                                amount={1234.56}
                                dob="24/12/1975"
                                phone="+50768934567"
                                email="matoectl@mail.com"
                                medicalTitle="Medical condition or Pre existing Condition"
                                medicalDetails="None"
                                onViewCard={() => {}}
                                onViewCertification={() => {}}
                                currency="USD"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</div>

    );
}