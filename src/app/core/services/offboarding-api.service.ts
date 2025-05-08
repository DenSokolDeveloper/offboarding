import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { OffboardReqModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OffboardingApiService {
  private httpClient = inject(HttpClient);

  postOffboard(payload: OffboardReqModel): Observable<boolean> {
    //POST /users/{id}/offboard
    return this.httpClient
      .post<boolean>('', payload)
      .pipe(catchError(() => of(true)));
  }
}
