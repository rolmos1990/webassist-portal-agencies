import "../assets/scss/components/_customer-card.scss";
import { UIButton } from "./Button";

type Gender = "Male" | "Female" | string;

export interface CustomerCardProps {
  name: string;
  gender: Gender;
  idNumber: string;
  amount: number; // 112.84
  dob: string; // "24/12/1975"
  phone: string; // "+507666712785"
  email: string;
  medicalTitle?: string; // "Medical condition or Pre existing Condition"
  medicalDetails?: string; // "Controlled hypertension, ..."
  onViewCard?: () => void;
  onViewCertification?: () => void;
  currency?: string; // default: USD
}

const genderIcon = (g: Gender) => {
  const lower = `${g}`.toLowerCase();
  if (lower.startsWith("male")) return "bi-gender-male";
  if (lower.startsWith("female")) return "bi-gender-female";
  return "bi-person";
};

const formatAmountParts = (amount: number, currency = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // "$112.84" -> ["$112", "84"]
  const [whole, cents] = formatter.format(amount).split(".");
  return { whole, cents };
};

export default function CustomerCard({
  name,
  gender,
  idNumber,
  amount,
  dob,
  phone,
  email,
  medicalTitle = "Medical condition or Pre existing Condition",
  medicalDetails = "",
  onViewCard,
  onViewCertification,
  currency = "USD",
}: CustomerCardProps) {
  const { whole, cents } = formatAmountParts(amount, currency);

  return (
    <div className="card shadow-sm rounded-4 customer-card">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="avatar rounded-circle bg-light d-inline-flex align-items-center justify-content-center">
              <i className="bi bi-person-fill fs-5 text-primary" />
            </div>
            <div>
              <div className="fw-semibold">{name}</div>

              <div className="d-flex align-items-center flex-wrap gap-2 text-muted small">
                <span className="d-inline-flex align-items-center gap-1">
                  <i className={`bi ${genderIcon(gender)} text-success`} />
                  <span>{gender}</span>
                </span>
                <span className="mx-1">•</span>
                <span className="d-inline-flex align-items-center gap-1">
                  <i className="bi bi-credit-card-2-front text-success" />
                  <span>{idNumber}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-end">
            <div className="fs-5 fw-semibold lh-1 price">
              {whole}.
              <span className="cents align-text-top">{cents}</span>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        {/* Info grid */}
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="text-muted small">DOB</div>
            <div>{dob}</div>
          </div>
          <div className="col-12 col-md-4">
            <div className="text-muted small">Phone</div>
            <div>{phone}</div>
          </div>
          <div className="col-12 col-md-4">
            <div className="text-muted small">Email</div>
            <div className="text-truncate" title={email}>
              {email}
            </div>
          </div>
        </div>

        {/* Medical section */}
        <div className="mt-4 mb-4">
          <div className="text-black small">{medicalTitle}</div>
          {medicalDetails && (
            <div className="text-muted small min-text-height min-lines-2">{medicalDetails}</div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-3 d-flex gap-2">
          <UIButton
            type="button"
            variant="outline-primary"
            icon="bi bi-file-earmark-arrow-down"
            onClick={onViewCard}
          >
            Card
          </UIButton>
          <UIButton
            type="button"
            variant="outline-primary"
            icon="bi bi-file-earmark-arrow-down"
            onClick={onViewCertification}
          >
            Certification
          </UIButton>
        </div>
      </div>
    </div>
  );
}
