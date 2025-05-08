import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffboardingComponent } from './offboarding.component';

const children: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./pages/employees/employees.module').then(
        (m) => m.EmployeesModule,
      ),
  },
  {
    path: 'staff',
    loadComponent: () =>
      import('./pages/staff/staff.component').then((c) => c.StaffComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

const routes: Routes = [
  {
    path: '',
    component: OffboardingComponent,
    children,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OffboardingModule {}
