import { HttpClient } from '@angular/common/http';
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
  addFinance(data: any): Observable<Finance> {
    return this._http.post<Finance>(`${this.baseUrl}/finances`, data);
  }
  updateFinance(id: number, data: Finance): Observable<Finance> {
    return this._http.put<Finance>(`${this.baseUrl}/finances/${id}`, data);
  }
  getFinanceList(): Observable<Finance[]> {
    return this._http.get<Finance[]>(`${this.baseUrl}/finances`);
  }
  deleteFinance(id: number): Observable<Finance> {
    return this._http.delete<Finance>(`${this.baseUrl}/finances/${id}`);
  }
}
