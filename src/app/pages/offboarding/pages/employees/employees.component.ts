import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Sort } from '@angular/material/sort';
import { take } from 'rxjs';

import { TableComponent } from '../../../../core/components/table/table.component';
import { TableColumnModel } from '../../../../core/models';
import { OffboardingService } from '../../services/offboarding.service';

import { EmployeesDisplayedColumns } from './constants';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent],
})
export class EmployeesComponent implements OnInit {
  private offboardingService = inject(OffboardingService);
  private destroyRef = inject(DestroyRef);

  public filters = this.offboardingService.filters;
  public employees = this.offboardingService.filteredEmployees;
  public displayedColumns: TableColumnModel[] = EmployeesDisplayedColumns;

  constructor() {
    effect(() => {
      const filters = this.filters();
      if (filters) {
        this.offboardingService.applyFilters();
      }
    });
  }

  ngOnInit(): void {
    this.initEmployees();
  }

  public sortChange($event: Sort): void {
    this.offboardingService.updateFilters({
      [$event.active]: $event.direction,
    });
  }

  private initEmployees(): void {
    this.offboardingService
      .getEmployees(this.filters())
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
