import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb';
import { UIButton } from '../components/Button';
import Offcanvas from '../components/Offcanvas';
import CreateClientVertical from '../components/Forms/CreateClientVertical';
import { ClientsTable } from '../components/Tables/ClientsTable';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import { useGetClientes } from '../api/generated';
import { GetClientesSort, GetClientesSortOrder } from '../api/schemas';
import type { SortDir, SortState } from '../components/DataTable';
import { toast } from '../services/toast';
import { getApiErrorMessage } from '../api/errors/ApiError';

const SORT_FIELD_BY_COLUMN: Record<string, GetClientesSort> = {
  name: GetClientesSort.nombre,
  email: GetClientesSort.email,
  sexo_nombre: GetClientesSort.sexo,
  pais_nombre: GetClientesSort.pais,
  fecha_nacimiento: GetClientesSort.nacimiento,
};

function Clients() {
  const { lang } = useI18nCache();
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortState | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (data: unknown) => {
    console.log(data);
    handleClose();
  };

  const sortField = sort ? SORT_FIELD_BY_COLUMN[sort.id] : undefined;
  const sortOrder = sort ? (sort.dir === 'asc' ? GetClientesSortOrder.ASC : GetClientesSortOrder.DESC) : undefined;

  const { data, isLoading, error } = useGetClientes(lang, {
    pagina: currentPage,
    ...(sortField ? { sort: sortField, sort_order: sortOrder } : {}),
  });

  useEffect(() => {
    if (error) {
      toast.error("Error", getApiErrorMessage(error, t('error_generico')));
    }
  }, [error, t]);

  const items = data?.data?.items ?? [];
  const paginacion = data?.data?.paginacion;

  const onSortChange = (next: { id: string; dir: SortDir }) => {
    setSort(next);
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-fluid py-3 px-4">
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          title="Create New Client"
          canClose={true}
          scroll={true}
          backdrop="static"
          width="380px"
        >
          <CreateClientVertical onSubmit={handleSubmit} onCancel={handleClose} />
        </Offcanvas>

        <Breadcrumb
          title={t('menu.clients')}
          rightContent={
            <div className="d-flex gap-2">
              <UIButton variant="dark" icon="" onClick={handleShow}>
                Create a Client
              </UIButton>
            </div>
          }
        />

        <div className="card border-0">
          <div className="card-body p-0">
            <ClientsTable
              data={items}
              loading={isLoading}
              sort={sort}
              onSortChange={onSortChange}
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

export default Clients;
