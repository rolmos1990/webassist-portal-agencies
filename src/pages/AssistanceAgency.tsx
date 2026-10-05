import { useEffect, useState } from 'react';
import { keepPreviousData } from '@tanstack/react-query';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import Offcanvas from '../components/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { AgencyAssistanceTable } from '../components/Tables/AgencyAssistanceTable';
import { useTranslation } from 'react-i18next';
import { useGetAsistenciasAgenteAgencia } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';
import { PATHS } from '../routes/Routes';
import FilterByPassengerForm from '../components/Forms/FilterByPassengerForm';
import {
  EMPTY_PASSENGER_FILTERS,
  toAssistanceFilterParams,
  type PassengerFilterValues,
} from '../components/Forms/passengerFilters';
import { useCountryOptions } from '../hooks/useCountryOptions';

function AssistanceAgency() {
  const { lang } = useI18nCache();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<PassengerFilterValues>(EMPTY_PASSENGER_FILTERS);
  const countryOptions = useCountryOptions();

  const handleApplyFilter = (values: PassengerFilterValues) => {
    setFilters(values);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data, isLoading, error } = useGetAsistenciasAgenteAgencia(
    lang,
    { pagina: currentPage, ...toAssistanceFilterParams(filters) },
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
        <Breadcrumb title={t('menu.agencyAssistances')} rightContent={
                  <div className="d-flex gap-2">
                <UIButton
                variant="outline-primary"
                icon=""
                onClick={() => setShowFilter(true)}
                >
                {t('filter_by')}
                </UIButton>
                  </div>
        } />      
        <Offcanvas
          show={showFilter}
          onHide={() => setShowFilter(false)}
          placement="end"
          title={t('filter_by')}
          canClose={true}
          scroll={true}
          backdrop="static"
          width="380px"
        >
          <FilterByPassengerForm
            defaultValues={filters}
            countryOptions={countryOptions}
            showVoucher
            onSubmit={handleApplyFilter}
            onCancel={() => setShowFilter(false)}
          />
        </Offcanvas>
            <div className="card">
              <div className="card-body p-0">
              <AgencyAssistanceTable
                  data={items}
                  loading={isLoading}
                  onShow={(row) => navigate(PATHS.assistances.detail(row.token), { state: { item: row } })}
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

export default AssistanceAgency;
