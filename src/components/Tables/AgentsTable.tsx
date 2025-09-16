import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { createAgentColumns } from "./AgentsDataTableConfig";
import type { AgentRow } from "../../data/agentData";
import DataTable, { currency } from "../DataTable";

export function AgentsTable({ data }: { data: AgentRow[] }) {
  const { t } = useTranslation('common');

  const onEdit = useCallback((row: AgentRow) => {
    console.log("Edit", row);
  }, []);

  const onToggle = useCallback((row: AgentRow) => {
    console.log("Toggle", row);
  }, []);

  const onDelete = useCallback((row: AgentRow) => {
    console.log("Delete", row);
  }, []);

  const columns = useMemo(
    () => createAgentColumns({ 
      currency, 
      t: (key: string) => t(`agents.${key}`), 
      onEdit, 
      onToggle, 
      onDelete 
    }),
    [t, onEdit, onToggle, onDelete]
  );

  return <DataTable<AgentRow> items={data} columns={columns} />;
}
