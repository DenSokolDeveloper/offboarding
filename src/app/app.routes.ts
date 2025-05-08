import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/offboarding/offboarding.module').then(
        (m) => m.OffboardingModule,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
