import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import CustomerCard from '../components/CustomerCard';
import { HorizontalCardList, HorizontalCardListItem } from '../components/HorizontalCardList';
import { StatusBadge } from '../components/StatusBadge';
import Offcanvas from '../components/Offcanvas';
import { useTranslation } from 'react-i18next';
import { currency } from '../components/DataTable';
import { defaultStatusTheme } from '../components/StatusBadge/StatusBadgeThemes';
import type {
  GetAsistenciasAgenteAgencia200DataItemsItem,
  GetCotizacionesAgenteAgencia200DataItemsItem,
} from '../api/schemas';
import { fromAsistencia, fromCotizacion, type VoucherBlock, type VoucherKind } from '../adapters/voucherDetail';
import { useGetBeneficiosCliente } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';

const openInNewTab = (url?: string) => {
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
};

const withIcon = (icon: string, text: string) => (
  <span className="d-inline-flex align-items-center">
    <i className={`bi ${icon} me-2 text-success`} />
    {text}
  </span>
);

interface Props {
  /** Detalle de voucher: asistencia (por defecto) o cotización */
  kind?: VoucherKind;
}

export default function AssistanceDetail({ kind = 'assistance' }: Props) {
    const [show, setShow] = useState(false);
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    // No hay endpoint de detalle: el item llega desde la lista (asistencias o cotizaciones)
    const state = location.state as { item?: unknown } | null;
    const voucher = kind === 'quote'
      ? fromCotizacion(state?.item as GetCotizacionesAgenteAgencia200DataItemsItem | undefined)
      : fromAsistencia(state?.item as GetAsistenciasAgenteAgencia200DataItemsItem | undefined);
    const code = state?.item ? voucher.code : (id ?? voucher.code);
    const multipleBlocks = voucher.blocks.length > 1;
    const { lang } = useI18nCache();

    // Se consultan al entrar al voucher para que el panel "Ver más" ya tenga los datos.
    // Sólo asistencias: las cotizaciones no tienen id de pasajero.
    const benefitsParams = voucher.benefits;
    const beneficios = useGetBeneficiosCliente(
      lang,
      benefitsParams?.voucher ?? '',
      benefitsParams?.clientId ?? '',
      { query: { enabled: !!benefitsParams } }
    );
    const benefitItems = beneficios.data?.data ?? [];

    useEffect(() => {
      if (beneficios.error) {
        toast.error("Error", getApiErrorMessage(beneficios.error, t('error_generico')));
      }
    }, [beneficios.error, t]);

    const renderStrip = (block: VoucherBlock, withGeneralData: boolean) => (
      <div className="flex-grow-1 border-bottom pb-3">
        <HorizontalCardList desktopCols={6}>
          {withGeneralData && (
            <HorizontalCardListItem
              title={t("assistanceDetail.issueDate")}
              value={voucher.issueDate}
              icon={""}
            />
          )}
          <HorizontalCardListItem
            title={t("assistanceDetail.departureLocation")}
            value={withIcon('bi-geo-alt', block.origin)}
            icon={""}
          />
          <HorizontalCardListItem
            title={t("assistanceDetail.destinationLocation")}
            value={withIcon('bi-geo-alt', block.destination)}
            icon={""}
          />
          <HorizontalCardListItem
            title={t("assistanceDetail.departureDate")}
            value={withIcon('bi-calendar3', block.exit)}
            icon={""}
          />
          <HorizontalCardListItem
            title={t("assistanceDetail.returnDate")}
            value={withIcon('bi-calendar3', block.return)}
            icon={""}
          />
          {withGeneralData && (
            <HorizontalCardListItem
              title={t("assistanceDetail.reference")}
              value={voucher.reference}
              icon={""}
            />
          )}
          {withGeneralData && (
            <HorizontalCardListItem
              title={t("assistanceDetail.paymentConfirmation")}
              value={withIcon('bi-credit-card', voucher.payment)}
              icon={""}
            />
          )}
        </HorizontalCardList>
      </div>
    );

    const renderTravelers = (block: VoucherBlock) => (
      <div className="mt-4">
        <h5 className="mb-4">{t("assistanceDetail.travellers")}</h5>
        <div className="row g-3">
          {block.travelers.length === 0 ? (
            <div className="col-12 text-muted small">{t("noData")}</div>
          ) : (
            block.travelers.map((traveler) => (
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
                  hideCard={!voucher.hasDocuments}
                  hideCertification={!voucher.hasDocuments}
                  currency="USD"
                />
              </div>
            ))
          )}
        </div>
      </div>
    );

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
        <UIButton
        variant="outline-primary"
        icon="bi bi-pencil"
        >
        {t("assistanceDetail.modifyVoucher")}
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
        backdrop={true}        // click/tap fuera del panel lo cierra (panel de solo lectura)
        width="380px"
      >
        <div className="container-fluid">
        <ul className="list-group list-group-flush">
        <div className="d-flex align-items-center justify-content-between mb-2">
        {/* El botón de cierre normalmente ya viene en el header del Offcanvas */}
      </div>
        {beneficios.isLoading && (
          <li className="list-group-item px-0 py-2">
            <div className="spinner-border spinner-border-sm" role="status" />
          </li>
        )}
        {!beneficios.isLoading && benefitItems.length === 0 && (
          <li className="list-group-item px-0 py-2 text-muted small">{t('noData')}</li>
        )}
        {benefitItems.map((item, idx) => (
          <li
            key={item.id ?? idx}
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
                <span className="fw-normal small">{item.nombre}</span>
              </div>
              <div className="col-4 text-end">
                <div className="fw-semibold small">{item.valor}</div>
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
              {code}
              <div className="ms-md-2 mt-2 mt-md-0">
                <StatusBadge status={voucher.statusKey} label={voucher.statusLabel} theme={defaultStatusTheme} />
              </div>
            </h4>

            <p className="mb-1 text-black pb-1">
              <b>{voucher.planTitle}</b>
            </p>
            <p className="mb-1 text-gray small pb-1">
              {voucher.total === null ? '—' : currency(voucher.total)} - {voucher.travelersCount} {t("assistanceDetail.travellers")}
            </p>
            {benefitsParams && (
            <button
  type="button"
  onClick={() => setShow(true)}
  className="btn btn-link text-decoration-none text-primary p-0"
>
  {t("assistanceDetail.viewMore")}
</button>
            )}
            </div>
             {/* Derecha: botones */}
             <div className="col-12 col-md-auto d-flex align-items-center justify-content-center justify-content-md-end gap-2 ms-md-auto">
             <UIButton variant="dark" size="sm" pill>
            {t("assistanceDetail.rePurchase")}
            </UIButton>
            {voucher.pdfUrl && (
              <UIButton
                variant="dark"
                size="sm"
                pill
                icon="bi bi-file-earmark-arrow-down"
                onClick={() => openInNewTab(voucher.pdfUrl)}
              >
              {t("assistanceDetail.downloadVoucher")}
              </UIButton>
            )}
            </div>
          </div>

          {voucher.blocks.length === 0 && renderStrip(
            { key: 'empty', planName: '—', origin: '—', destination: '—', exit: '—', return: '—', travelers: [] },
            true
          )}

          {voucher.blocks.map((block, idx) => (
            <div key={block.key} className={idx > 0 ? 'mt-4 pt-2' : undefined}>
              {/* Cotización con varias líneas: cada línea con su plan, datos y pasajeros */}
              {multipleBlocks && <h6 className="fw-semibold mt-3 mb-2">{block.planName}</h6>}
              {renderStrip(block, idx === 0)}
              {renderTravelers(block)}
            </div>
          ))}
            </div>
        </div>
  </div>
</div>

    );
}
