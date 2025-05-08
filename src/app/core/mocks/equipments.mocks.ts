import { EquipmentModel } from '../models';

export const equipmentsMocks = (count = 20): EquipmentModel[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `Equipment ${i + 1}`,
  }));
};
