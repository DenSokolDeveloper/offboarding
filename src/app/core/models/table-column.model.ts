import { EntityModel } from './entity.model';

export interface TableColumnModel extends EntityModel<string> {
  transform?: (value: unknown) => string;
}
