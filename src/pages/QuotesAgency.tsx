import { useEffect, useState } from 'react';
import { keepPreviousData } from '@tanstack/react-query';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import CreateAgenciesVertical from '../components/Forms/CreateAgenciesVertical';
import FilterByPassengerForm from '../components/Forms/FilterByPassengerForm';
import {
  EMPTY_PASSENGER_FILTERS,
  toQuoteFilterParams,
  type PassengerFilterValues,
} from '../components/Forms/passengerFilters';
import Offcanvas from '../components/Offcanvas';
import { AgencyQuotesTable } from '../components/Tables/AgencyQuotesTable';
import { useTranslation } from 'react-i18next';
import { useGetCotizacionesAgenteAgencia } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { useCountryOptions } from '../hooks/useCountryOptions';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';

function QuotesAgency() {
  const [show, setShow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<PassengerFilterValues>(EMPTY_PASSENGER_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const { lang } = useI18nCache();
  const countryOptions = useCountryOptions();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (data: any) => {
    handleClose();
  };

  const handleApplyFilter = (values: PassengerFilterValues) => {
    setFilters(values);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const locations = [
    { value: 'pa-panama', label: 'Panama' },
    { value: 'pa-colon', label: 'Colón' },
  ];

  const { data, isLoading, error } = useGetCotizacionesAgenteAgencia(
    lang,
    { pagina: currentPage, ...toQuoteFilterParams(filters) },
    {
      // Evita que paginacion.cantidad_paginas caiga al fallback (?? 1) mientras
      // carga la página siguiente, lo que resetearía el paginador a la página 1.
      query: { placeholderData: keepPreviousData },
    }
  );

  useEffect(() => {
    if (error) {
      toast.error("Error", getApiErrorMessage(error, t('error_generico')));
    }
  }, [error, t]);

  const items = data?.data?.items ?? [];
  const paginacion = data?.data?.paginacion;

  return (
<div className="min-vh-100 bg-light">
<div className="container-fluid py-3 px-4">
<Breadcrumb title={t("menu.agencyQuotes")} rightContent={
          <div className="d-flex gap-2">
        <UIButton
        variant="outline-primary"
        icon=""
        onClick={() => setShowFilter(true)}
        >
        {t("filtrar_por")}
        </UIButton>
        <UIButton
        variant="dark"
        icon=""
        onClick={handleShow}
        >
        {t("create_new_agency")}
        </UIButton>
          </div>
        } />      
        <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        title="Create New Agent"
        canClose={true}
        scroll={true}
        backdrop="static"
        width="380px"
      >
        <CreateAgenciesVertical onSubmit={handleSubmit} onCancel={handleClose} locations={locations} />
        </Offcanvas>
        <Offcanvas
        show={showFilter}
        onHide={() => setShowFilter(false)}
        placement="end"
        title={t("filtrar_por")}
        canClose={true}
        scroll={true}
        backdrop="static"
        width="380px"
      >
        <FilterByPassengerForm
          defaultValues={filters}
          countryOptions={countryOptions}
          showCountry
          onSubmit={handleApplyFilter}
          onCancel={() => setShowFilter(false)}
        />
        </Offcanvas>
            <div className="card">
              <div className="card-body p-0">
              <AgencyQuotesTable
                  data={items}
                  loading={isLoading}
                  pagination={{
                      totalPages: paginacion?.cantidad_paginas ?? 1,
                      currentPage,
                      align: "center",
                      wrap: "none",
                      onChange: setCurrentPage,
                  }}
                  />
              </div>
            </div>
      </div>
    </div>
  );
}

export default QuotesAgency;
