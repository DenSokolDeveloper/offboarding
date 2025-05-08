import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';

import { TableComponent } from '../../../../../../core/components/table/table.component';
import { EmployeeStatus } from '../../../../../../core/models';
import { OffboardingService } from '../../../../services/offboarding.service';

import { OffboardModalComponent } from './components/offboard-modal/offboard-modal.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, TableComponent],
})
export class EmployeeDetailsComponent {
  private offboardingService = inject(OffboardingService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  public currentEmployee = this.offboardingService.selectedEmployee;

  public goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  public openOffboardModal(): void {
    this.dialog
      .open(OffboardModalComponent, { autoFocus: false })
      .afterClosed()
      .pipe(filter(Boolean), take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.offboardingService.changeEmployeeStatus(
          this.currentEmployee().id,
          EmployeeStatus.OFFBOARDED,
        );
        this.goBack();
      });
  }
}
