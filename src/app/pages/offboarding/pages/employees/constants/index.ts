import { EquipmentModel, TableColumnModel } from '../../../../../core/models';

export const EmployeesDisplayedColumns: TableColumnModel[] = [
  {
    id: 'name',
    name: 'Full Name',
    sortable: true,
  },
  {
    id: 'email',
    name: 'Email',
    sortable: true,
  },
  {
    id: 'department',
    name: 'Department',
    sortable: true,
  },
  {
    id: 'equipments',
    name: 'Equipment',
    sortable: true,
    transform: (value) =>
      (value as EquipmentModel[]).map((el) => el.name).join(', '),
  },
  {
    id: 'status',
    name: 'Status',
    sortable: true,
  },
];
