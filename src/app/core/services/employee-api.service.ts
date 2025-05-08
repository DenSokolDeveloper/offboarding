import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

import { EmployeesFilters } from '../../pages/offboarding/interfaces';
import { EmployeeModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  private httpClient = inject(HttpClient);

  public getEmployees(filters: EmployeesFilters): Observable<EmployeeModel[]> {
    //GET /employees
    return this.httpClient.get<EmployeeModel[]>('', {
      params: filters as Params,
    });
  }

  public getEmployeeById(id: string): Observable<EmployeeModel> {
    //GET /employees/{id}
    return this.httpClient.get<EmployeeModel>(`${id}`);
  }
}
