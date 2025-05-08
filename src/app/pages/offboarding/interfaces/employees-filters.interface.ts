import { EmployeeModel, BaseFilteringModel } from '../../../core/models';

export type EmployeesFilters = {
  search?: string;
} & BaseFilteringModel & {
    [K in keyof EmployeeModel]?: string;
  };
