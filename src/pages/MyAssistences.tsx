import { useEffect, useState } from 'react';
import { keepPreviousData } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { AgencyAssistanceTable } from '../components/Tables/AgencyAssistanceTable';
import { useGetAsistenciasAgenteAgencia } from '../api/generated';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';
import { PATHS } from '../routes/Routes';

function MyAssistances() {
  const { lang } = useI18nCache();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetAsistenciasAgenteAgencia(
    lang,
    { pagina: currentPage },
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
        <Breadcrumb title={t('menu.myAssistances')} />

        <div className="card border-0">
          <div className="card-body p-0">
            <AgencyAssistanceTable
              data={items}
              loading={isLoading}
              onShow={(row) => navigate(PATHS.assistances.detail(row.token))}
              pagination={{
                totalPages: paginacion?.cantidad_paginas ?? 1,
                currentPage,
                align: 'center',
                wrap: 'none',
                onChange: setCurrentPage,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAssistances;
