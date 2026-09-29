import { useTranslation } from "react-i18next";
import CustomerCard from "./CustomerCard";
import type { VoucherTraveler } from "../adapters/voucherDetail";

interface TravelersListProps {
  travelers: VoucherTraveler[];
  /** Oculta tarjeta y certificado (p. ej. cotizaciones) */
  hideDocuments?: boolean;
}

const openInNewTab = (url?: string) => {
  if (url) window.open(url, "_blank", "noopener,noreferrer");
};

export default function TravelersList({ travelers, hideDocuments = false }: TravelersListProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-4">
      <h5 className="mb-4">{t("assistanceDetail.travellers")}</h5>
      <div className="row g-3">
        {travelers.length === 0 ? (
          <div className="col-12 text-muted small">{t("noData")}</div>
        ) : (
          travelers.map((traveler) => (
            <div className="col-12 col-md-5" key={traveler.key}>
              <CustomerCard
                name={traveler.name}
                gender={traveler.gender}
                idNumber={traveler.idNumber}
                amount={traveler.amount}
                dob={traveler.dob}
                phone={traveler.phone}
                email={traveler.email}
                medicalDetails={traveler.medicalDetails}
                onViewCard={() => openInNewTab(traveler.cardUrl)}
                onViewCertification={() => openInNewTab(traveler.certificationUrl)}
                hideCard={hideDocuments}
                hideCertification={hideDocuments}
                currency="USD"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
