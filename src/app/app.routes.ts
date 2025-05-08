import { Routes } from '@angular/router';

import { EmployeeDetailsResolver } from './pages/offboarding/pages/employees/pages/employee-details/employee-details.resolver';

export const routes: Routes = [
  {
    path: 'offboarding',
    loadChildren: () =>
      import('./pages/offboarding/offboarding.module').then(
        (m) => m.OffboardingModule,
      ),
  },
  {
    path: 'employee/:id',
    loadChildren: () =>
      import(
        './pages/offboarding/pages/employees/pages/employee-details/employee-details.module'
      ).then((m) => m.EmployeeDetailsModule),
    resolve: {
      key: EmployeeDetailsResolver,
    },
  },
  {
    path: '**',
    redirectTo: 'offboarding',
  },
];
