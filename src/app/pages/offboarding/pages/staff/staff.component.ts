import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-staff',
  template: `<h3>Mocked page to show how tabs are working</h3>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffComponent {}
