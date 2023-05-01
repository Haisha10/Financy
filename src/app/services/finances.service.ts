import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  constructor(private _http: HttpClient) {}
  addFinance(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/finances', data);
  }
  updateFinance(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/finances/${id}`, data);
  }
  getFinanceList(): Observable<any> {
    return this._http.get('http://localhost:3000/finances');
  }
  deleteFinance(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/finances/${id}`);
  }
}
