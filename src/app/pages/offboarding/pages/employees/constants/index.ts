import { EquipmentModel, TableColumnModel } from '../../../../../core/models';

export const EmployeesDisplayedColumns: TableColumnModel[] = [
  {
    id: 'name',
    name: 'Full Name',
  },
  {
    id: 'email',
    name: 'Email',
  },
  {
    id: 'department',
    name: 'Department',
  },
  {
    id: 'equipments',
    name: 'Equipment',
    transform: (value) =>
      (value as EquipmentModel[]).map((el) => el.name).join(', '),
  },
  {
    id: 'status',
    name: 'Status',
  },
];
