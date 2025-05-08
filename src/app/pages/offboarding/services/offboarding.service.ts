import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { employeesMocks } from '../../../core/mocks';
import { EmployeeModel, SortDirection } from '../../../core/models';
import { EmployeeApiService } from '../../../core/services';
import { EmployeesFilters } from '../interfaces';

@Injectable()
export class OffboardingService {
  private employeeApiService = inject(EmployeeApiService);

  public filters = signal<EmployeesFilters>({});
  public employees = signal<EmployeeModel[]>([]);
  public filteredEmployees = signal<EmployeeModel[]>([]);
  public selectedEmployee = signal<EmployeeModel>(null);

  public updateFilters(newFilters: Partial<EmployeesFilters>): void {
    const filters = this.filters();
    this.filters.set({ ...filters, ...newFilters });
  }

  public applyFilters(): void {
    const filters = this.filters() ?? {};
    let data = [...this.employees()];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      data = data.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(search) ||
          emp.department?.toLowerCase().includes(search),
      );
    }

    const sortKeys = Object.keys(filters).filter(
      (key) =>
        data.length &&
        (key in data[0] || key === 'equipments') &&
        (filters as any)[key] !== undefined &&
        ['asc', 'desc'].includes((filters as any)[key]),
    ) as (keyof EmployeeModel)[];

    sortKeys.forEach((key) => {
      const direction = (filters as any)[key] as SortDirection;
      data.sort((a, b) => {
        let aVal: any = a[key as keyof EmployeeModel];
        let bVal: any = b[key as keyof EmployeeModel];

        if (key === 'equipments') {
          aVal = (a.equipments ?? []).length;
          bVal = (b.equipments ?? []).length;
          return direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return direction === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        return 0;
      });
    });

    const page = filters.page ?? 1;
    const limit = filters.limit ?? data.length;
    const start = (page - 1) * limit;
    const end = start + limit;

    this.filteredEmployees.set(data.slice(start, end));
  }

  public getEmployees(filters: EmployeesFilters): Observable<EmployeeModel[]> {
    return this.employeeApiService.getEmployees(filters).pipe(
      catchError(() => of(employeesMocks())),
      tap((employees) => {
        this.employees.set(employees);
        this.filteredEmployees.set(employees);
      }),
    );
  }

  public getEmployeeById(): Observable<EmployeeModel> {
    return this.employeeApiService.getEmployeeById().pipe(
      catchError(() => of(employeesMocks(1)[0])),
      tap((employee) => this.selectedEmployee.set(employee)),
    );
  }
}
