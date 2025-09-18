import type { ReactNode } from 'react';

interface RowViewProps {
  label: string;
  hint?: string;
  edit: boolean;
  show: ReactNode;
  editNode: ReactNode;
}

export function RowView({
    label,
    hint,
    edit,
    show,
    editNode,
  }: RowViewProps) {
    return (
      <div className="row py-3">
        <div className="col-12 col-md-4">
          <div className="fw-semibold text-secondary">{label}</div>
          {hint && <small className="text-secondary d-block">{hint}</small>}
        </div>
        <div className="col-12 col-md-8 d-flex align-items-center gap-3 flex-wrap">
          {edit ? editNode : show}
        </div>
      </div>
    );
  }