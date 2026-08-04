import LinkedIcon from '../../assets/images/icons/link-icon.svg';
import type { GetDashboard200DataRenovaciones } from '../../api/schemas';

interface RevenueRenewalsSectionProps {
  data?: GetDashboard200DataRenovaciones;
}

const formatCurrency = (value?: number) =>
  (value ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function RevenueRenewalsSection({ data }: RevenueRenewalsSectionProps) {
  const pendientes = data?.pendientes;
  const completadas = data?.completadas;

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
            <div style={{ color: "#4b647e", fontSize: "11px", fontWeight: "600" }}>
              Pending
            </div>
            <div
              style={{ color: "#21272a", fontSize: "13px", fontWeight: "700" }}
            >
              {formatCurrency(pendientes?.monto)}
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
                  {formatCurrency(pendientes?.comisiones)}
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
            <div style={{ color: "#4b647e", fontSize: "11px", fontWeight: "600" }}>
              Completed
            </div>
            <div
              style={{ color: "#21272a", fontSize: "13px", fontWeight: "700" }}
            >
              {formatCurrency(completadas?.monto)}
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
                    fontWeight: 700,
                  }}
                >
                  {formatCurrency(completadas?.comisiones)}
                </div>
                <div style={{ color: "#4b647e", fontSize: "11px" }}>
                  Total commissions earned
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
