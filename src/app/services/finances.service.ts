import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Finance } from '../models/finance.model';

import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  private baseUrl = environment.base_url;
  constructor(private _http: HttpClient) {}
  addFinance(data: any, currentUserId: number): Observable<Finance> {
    return this._http.post<Finance>(`${this.baseUrl}/finances`, data, {
      params: new HttpParams().set('userId', currentUserId)
    });
  }
  updateFinance(id: number, data: Finance, currentUserId: number): Observable<Finance> {
    return this._http.put<Finance>(`${this.baseUrl}/finances`, data, {
      params: new HttpParams().set('userId', currentUserId).set('financeId', id)
    });
  }
  getFinanceList(currentUserId: number): Observable<Finance[]> {
    return this._http.get<Finance[]>(`${this.baseUrl}/finances`, {
      params: new HttpParams().set('userId', currentUserId)
    });
  }
  deleteFinance(id: number): Observable<Finance> {
    return this._http.delete<Finance>(`${this.baseUrl}/finances`, {
      params: new HttpParams().set('financeId', id)
    });
  }
}
