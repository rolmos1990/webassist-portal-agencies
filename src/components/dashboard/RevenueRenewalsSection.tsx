import LinkedIcon from '../../assets/images/icons/link-icon.svg';

export default function RevenueRenewalsSection() {
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
              $49,223.00
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
                  $3,872.00
                </div>
                <div style={{ color: "#4b647e", fontSize: "11px" }}>
                  Total commissions earned
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex align-items-end gap-2 mt-4 mt-md-0">
          <div
            style={{
              width: "12px",
              height: "91px",
              background: "#a6e97a",
              borderRadius: "4px",
            }}
          ></div>
          <div
            style={{
              width: "12px",
              height: "27px",
              background: "#6ee0f5",
              borderRadius: "4px"
            }}
          ></div>
          <div>
            <div
              style={{ color: "#21272a", fontSize: "13px", fontWeight: "700" }}
            >
              $52,424.00
            </div>
            <div style={{ color: "#4b647e", fontSize: "11px" }}>
              Projected revenue for "2025"
            </div>
            <div className="d-flex align-items-center gap-2 mt-2">
              <div>
                <div
                  style={{
                    color: "#21272a",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  $1,423
                </div>
                <div style={{ color: "#4b647e", fontSize: "11px" }}>
                  Project commissions for "2025"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
