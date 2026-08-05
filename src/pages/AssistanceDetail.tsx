import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import CustomerCard from '../components/CustomerCard';
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { StatusBadge } from '../components/StatusBadge';
import Offcanvas from '../components/Offcanvas';
import { BenefitsExample } from '../examples/BenefitsExample';
import { useTranslation } from 'react-i18next';
import { currency } from '../components/DataTable';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import type { GetAsistenciasAgenteAgencia200DataItemsItem } from '../api/schemas';

export default function AssistanceDetail() {
    const [show, setShow] = useState(false);
    const { t } = useTranslation();
    const { lang } = useI18nCache();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const item = (location.state as { item?: GetAsistenciasAgenteAgencia200DataItemsItem } | null)?.item;
    const vouchers = item?.vouchers ?? [];

    return (
<div className="min-vh-100 bg-light">
  <div className="container-fluid py-3 px-4">
        <Breadcrumb title={t('assistanceDetail.back')} hasBack rightContent={
          <div className="d-flex gap-2">
        <UIButton
        variant="outline-primary"
        icon="bi bi-envelope"
        >
        {t("assistanceDetail.resendVoucher")}
        </UIButton>
          </div>
        } />
        <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"        // start | end | top | bottom
        title={t("assistanceDetail.benefits")}
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
              {item?.token ?? id ?? ""}
              <div className="ms-md-2 mt-2 mt-md-0">
                <StatusBadge status="" theme={{ default: { tone: "secondary", label: t("assistancesTable.notDefined") } }} />
              </div>
            </h4>

            <p className="mb-1 text-gray small pb-1">
              {currency(Number(item?.total ?? 0))} - {vouchers.length} {t("assistancesTable.documents")}
            </p>
            <button
  type="button"
  onClick={() => setShow(true)}
  className="btn btn-link text-decoration-none text-primary p-0"
>
  {t("assistanceDetail.viewMore")}
</button>
            </div>
          </div>
                <div className="flex-grow-1 border-bottom pb-3">
                                    <HorizontalCardList desktopCols={6}>
                                    <HorizontalCardListItem
                                        title={t("assistanceDetail.issueDate")}
                                        value={item?.fecha ?? ""}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem
                                        title={t("assistanceDetail.departureLocation")}
                                        value={""}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem
                                        title={t("assistanceDetail.destinationLocation")}
                                        value={""}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem
                                        title={t("assistanceDetail.departureDate")}
                                        value={""}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem
                                        title={t("assistanceDetail.returnDate")}
                                        value={""}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem
                                        title={t("assistanceDetail.reference")}
                                        value={""}
                                        icon={""}
                                      />
                                      <HorizontalCardListItem
                                        title={t("assistanceDetail.paymentId")}
                                        value={""}
                                        icon={""}
                                      />
                                    </HorizontalCardList>
                </div>
                <div className="mt-4">
                    <h5 className="mb-4">{t("assistancesTable.documents")}</h5>
                    <div className="row">
                        {vouchers.length === 0 ? (
                          <div className="col-12 text-muted small">{t("noData")}</div>
                        ) : (
                          vouchers.map((voucher, idx) => {
                            const links = lang === 'en' ? voucher.links_tarjetas_en : voucher.links_tarjetas_es;
                            const file = links?.[0]?.file;

                            return (
                              <div className="col-12 col-md-5" key={voucher.voucher ?? idx}>
                                  <CustomerCard
                                      name={voucher.nombre ?? ""}
                                      gender=""
                                      idNumber=""
                                      amount={0}
                                      dob=""
                                      phone=""
                                      email=""
                                      onViewCard={() => {
                                        if (file) window.open(file, '_blank', 'noopener,noreferrer');
                                      }}
                                      hideCertification
                                      currency="USD"
                                  />
                              </div>
                            );
                          })
                        )}
                    </div>
                </div>
            </div>
        </div>
  </div>
</div>

    );
}
