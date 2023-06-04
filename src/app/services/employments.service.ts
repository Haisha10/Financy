import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employment } from '../models/employment.model';

import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class EmploymentsService {
  private baseUrl = environment.base_url;
  constructor(private _http: HttpClient) {}
  addEmployment(data: any): Observable<Employment> {
    return this._http.post<Employment>(`${this.baseUrl}/employments`, data);
  }
  updateEmployment(id: number, data: Employment): Observable<Employment> {
    return this._http.put<Employment>(`${this.baseUrl}/employments/${id}`, data);
  }
  getEmploymentList(): Observable<Employment[]> {
    return this._http.get<Employment[]>(`${this.baseUrl}/employments`);
  }
  deleteEmployment(id: number): Observable<Employment> {
    return this._http.delete<Employment>(`${this.baseUrl}/employments/${id}`);
  }
}
