import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { OffboardingService } from '../../../../services/offboarding.service';
import {TableComponent} from '../../../../../../core/components/table/table.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, TableComponent],
})
export class EmployeeDetailsComponent {
  private offboardingService = inject(OffboardingService);
  private location = inject(Location);

  public currentUser = this.offboardingService.selectedEmployee;

  public goBack(): void {
    this.location.back();
  }

  public openOffboardModal(): void {

  }
}
