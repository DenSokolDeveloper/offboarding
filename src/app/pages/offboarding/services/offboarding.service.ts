import { inject, Injectable, signal } from '@angular/core';
import { catchError, filter, Observable, of, tap } from 'rxjs';

import { employeesMocks } from '../../../core/mocks';
import {
  EmployeeModel,
  EmployeeStatus,
  OffboardReqModel,
  SortDirection,
} from '../../../core/models';
import {
  EmployeeApiService,
  OffboardingApiService,
} from '../../../core/services';
import { EmployeesFilters } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class OffboardingService {
  private employeeApiService = inject(EmployeeApiService);
  private offboardingApiService = inject(OffboardingApiService);

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

  public changeEmployeeStatus(
    employeeId: string,
    status: EmployeeStatus,
  ): void {
    let employees = this.employees();
    employees = employees.map((employee) =>
      employee.id === employeeId ? { ...employee, status } : employee,
    );
    this.employees.set([...employees]);
  }

  public getEmployees(filters: EmployeesFilters): Observable<EmployeeModel[]> {
    return this.employeeApiService.getEmployees(filters).pipe(
      catchError(() => of(employeesMocks())),
      filter(() => !this.employees().length),
      tap((employees) => {
        this.employees.set(employees);
        this.filteredEmployees.set(employees);
      }),
    );
  }

  public getEmployeeById(id: string): Observable<EmployeeModel> {
    const mockUser = (
      this.filteredEmployees().length
        ? this.filteredEmployees()
        : employeesMocks()
    ).find((el) => el.id === id);

    return this.employeeApiService.getEmployeeById(id).pipe(
      catchError(() => of(mockUser)),
      tap((employee) => this.selectedEmployee.set(employee)),
    );
  }

  public postOffboard(payload: OffboardReqModel): Observable<boolean> {
    return this.offboardingApiService
      .postOffboard(payload)
      .pipe(catchError(() => of(true)));
  }
}
