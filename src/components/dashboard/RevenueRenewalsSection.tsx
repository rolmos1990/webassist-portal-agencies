import LinkedIcon from '../../assets/images/icons/link-icon.svg';

interface RevenueRenewalsSectionLabels {
  title: string;
  subtitle: string;
  pending: string;
  completed: string;
  pendingTotal: string;
  completedTotal: string;
  commissions: string;
}

interface RevenueRenewalsSectionAmounts {
  total: string;
  commissions: string;
}

interface RevenueRenewalsSectionProps {
  labels: RevenueRenewalsSectionLabels;
  pending: RevenueRenewalsSectionAmounts;
  completed: RevenueRenewalsSectionAmounts;
}

export default function RevenueRenewalsSection({ labels, pending, completed }: RevenueRenewalsSectionProps) {
  return (
    <div className="p-3 bg-white rounded-2 flex-fill" style={{ minWidth: 0, overflow: 'hidden' }}>
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
            <div style={{ color: "#4b647e", fontSize: "11px", fontWeight: "600" }}>
              {labels.pending}
            </div>
            <div
              style={{ color: "#21272a", fontSize: "13px", fontWeight: "700" }}
            >
              {pending.total}
            </div>
            <div style={{ color: "#4b647e", fontSize: "11px" }}>
              {labels.pendingTotal}
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
                  {pending.commissions}
                </div>
                <div style={{ color: "#4b647e", fontSize: "11px" }}>
                  {labels.commissions}
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
            <div style={{ color: "#4b647e", fontSize: "11px", fontWeight: "600" }}>
              {labels.completed}
            </div>
            <div
              style={{ color: "#21272a", fontSize: "13px", fontWeight: "700" }}
            >
              {completed.total}
            </div>
            <div style={{ color: "#4b647e", fontSize: "11px" }}>
              {labels.completedTotal}
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
                  {completed.commissions}
                </div>
                <div style={{ color: "#4b647e", fontSize: "11px" }}>
                  {labels.commissions}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
