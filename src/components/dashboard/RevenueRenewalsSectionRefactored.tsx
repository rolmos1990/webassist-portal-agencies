import LinkedIcon from '../../assets/images/icons/link-icon.svg';

interface RevenueRenewalsSectionProps {
  data?: {
    totalRenewal: number;
    monthlyGrowth: number;
    yearlyGrowth: number;
  };
}

export default function RevenueRenewalsSection({ data }: RevenueRenewalsSectionProps) {
  // Use provided data or fallback to default data
  const totalRenewal = data?.totalRenewal || 49223.00;
  const monthlyGrowth = data?.monthlyGrowth || 12.5;
  const yearlyGrowth = data?.yearlyGrowth || 8.3;

  return (
    <div className="p-3 bg-white rounded-2 flex-fill" style={{ minWidth: 0, overflow: 'hidden' }}>
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="">
          <h1 className="p-0 m-0" style={{ fontSize: "14px", fontWeight: "600" }}>
            Revenue From Renewals
          </h1>
          <p className="p-0 m-0 mt-1" style={{ color: "#4b647e", fontSize: "13px" }}>
            Income generated from customers through renewals
          </p>
        </div>
        <img src={LinkedIcon} alt="link-icon" />
      </div>
      <div className="row align-items-end" style={{ marginTop: "22px" }}>
        <div className="col-12 col-md-6 d-flex align-items-end gap-2">
          <div
            style={{
              width: "12px",
              height: "84px",
              background: "#a6e97a",
              borderRadius: "4px",
            }}
          ></div>
          <div
            style={{
              width: "12px",
              height: "14px",
              background: "#6ee0f5",
              borderRadius: "4px"
            }}
          ></div>
          <div>
            <div
              style={{ color: "#21272a", fontSize: "13px", fontWeight: "700" }}
            >
              ${totalRenewal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ color: "#4b647e", fontSize: "11px" }}>
              Total renewal done
            </div>
            <div className="d-flex align-items-center gap-2 mt-2">
              <div>
                <div
                  style={{
                    color: "#21272a",
                    fontSize: "13px",
                    fontWeight: "700"
                  }}
                >
                  +{monthlyGrowth}%
                </div>
                <div style={{ color: "#4b647e", fontSize: "11px" }}>
                  Monthly growth
                </div>
              </div>
              <div className="ms-3">
                <div
                  style={{
                    color: "#21272a",
                    fontSize: "13px",
                    fontWeight: "700"
                  }}
                >
                  +{yearlyGrowth}%
                </div>
                <div style={{ color: "#4b647e", fontSize: "11px" }}>
                  Yearly growth
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div style={{ color: "#4b647e", fontSize: "12px" }}>
              Current Month
            </div>
            <div style={{ color: "#21272a", fontSize: "12px", fontWeight: "600" }}>
              ${(totalRenewal * 0.15).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div style={{ color: "#4b647e", fontSize: "12px" }}>
              Previous Month
            </div>
            <div style={{ color: "#21272a", fontSize: "12px", fontWeight: "600" }}>
              ${(totalRenewal * 0.13).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ color: "#4b647e", fontSize: "12px" }}>
              Same Month Last Year
            </div>
            <div style={{ color: "#21272a", fontSize: "12px", fontWeight: "600" }}>
              ${(totalRenewal * 0.85).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
