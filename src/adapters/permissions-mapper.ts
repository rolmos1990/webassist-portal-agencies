import type { CheckOption } from "../components/Forms/Inputs/InputCheckBoxList";
import type { UserPermissions } from "../data/userPermissionData";

export function mapPermissionsToCheckOptions(
  perms: UserPermissions[]
): CheckOption[] {
  return perms.map((p) => ({
    value: p.id,
    label: p.name,
    description: p.description,
    defaultChecked: p.defaultChecked,
  }));
}