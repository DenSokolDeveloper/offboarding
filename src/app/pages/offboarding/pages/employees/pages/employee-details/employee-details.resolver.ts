import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { EmployeeModel } from '../../../../../../core/models';
import { OffboardingService } from '../../../../services/offboarding.service';

export const EmployeeDetailsResolver: ResolveFn<EmployeeModel> = (
  route: ActivatedRouteSnapshot,
): Observable<EmployeeModel> => {
  const offboardingService = inject(OffboardingService);

  return offboardingService.getEmployeeById(route.params['id']);
};
