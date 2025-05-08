import { EmployeeModel, EmployeeStatus } from '../models';
import { randomNum } from '../utils';

import { equipmentsMocks } from './equipments.mocks';

export const employeesMocks = (count = 20): EmployeeModel[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `Employee ${i + 1}`,
    department: `Department ${i + 1}`,
    status: [EmployeeStatus.ACTIVE, EmployeeStatus.OFFBOARDED][randomNum(1)],
    email: `email${i + 1}@gmail.com`,
    equipments: equipmentsMocks(randomNum(20)),
  }));
};
