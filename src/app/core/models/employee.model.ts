import { EntityModel } from './entity.model';
import { EquipmentModel } from './equipment.model';

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  OFFBOARDED = 'OFFBOARDED',
}

export interface EmployeeModel extends EntityModel<string> {
  department: string;
  status: EmployeeStatus;
  email: string;
  equipments: EquipmentModel[];
}
