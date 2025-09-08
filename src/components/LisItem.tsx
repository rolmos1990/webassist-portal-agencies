import { StatusPill } from "./StatusPill";

interface ListItemProps {
  item: any;
}

export const ListItem = ({ item }: ListItemProps) => {
  const statusVariant =
    item.status === "Active" ? "success" : item.status === "Completed" ? "secondary" : "warning";

  return (
    <a href={item.href || "#"} className="text-decoration-none text-reset">
      <div
        className="border rounded-3 p-3 p-md-4 mb-3 bg-body"
        role="button"
      >
        <div className="row align-items-center g-3">
          <div className="col-12 col-md">
            <div className="text-uppercase small text-body-secondary">{item.name}</div>
            <div className="fw-medium">{item.number}</div>
          </div>
          <div className="col-12 col-md-3">
            <div className="text-uppercase small text-body-secondary">Plan Name</div>
            <div className="fw-medium">{item.name}</div>
          </div>
          <div className="col-6 col-md-2">
            <div className="text-uppercase small text-body-secondary">Status</div>
            <StatusPill label={item.status} variant={statusVariant} />
          </div>
          <div className="col-6 col-md-2">
            <div className="text-uppercase small text-body-secondary">Start Date</div>
            <div className="fw-medium">{item.startDate}</div>
          </div>
          <div className="col-6 col-md-2">
            <div className="text-uppercase small text-body-secondary">End Date</div>
            <div className="fw-medium">{item.endDate}</div>
          </div>
          <div className="col-6 col-md-2">
            <div className="text-uppercase small text-body-secondary">Amount Paid</div>
            <div className="fw-medium">{item.amountPaid}</div>
          </div>
          <div className="col-auto ms-auto d-none d-md-flex">
            <i className="bi bi-arrow-right fs-4 opacity-50" />
          </div>
        </div>
      </div>
    </a>
  );
};