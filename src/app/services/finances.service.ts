import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  constructor(private _http: HttpClient) {}
  addFinance(data: any): Observable<any> {
    return this._http.post('https://my-json-server.typicode.com/Haisha10/Financy/finances', data);
  }
  updateFinance(id: number, data: any): Observable<any> {
    return this._http.put(`https://my-json-server.typicode.com/Haisha10/Financy/finances/${id}`, data);
  }
  getFinanceList(): Observable<any> {
    return this._http.get('https://my-json-server.typicode.com/Haisha10/Financy/finances');
  }
  deleteFinance(id: number): Observable<any> {
    return this._http.delete(`https://my-json-server.typicode.com/Haisha10/Financy/finances/${id}`);
  }
}
