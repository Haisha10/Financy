import { HttpClient, HttpParams } from '@angular/common/http';
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
  addEmployment(data: any, currentUserId: number): Observable<Employment> {
    return this._http.post<Employment>(`${this.baseUrl}/employments`, data, {
      params: new HttpParams().set('userId', currentUserId)
    });
  }
  updateEmployment(id: number, data: Employment, currentUserId: number): Observable<Employment> {
    return this._http.put<Employment>(`${this.baseUrl}/employments`, data, {
      params: new HttpParams().set('employmentId', id).set('userId', currentUserId)
    });
  }
  getEmploymentList(): Observable<Employment[]> {
    return this._http.get<Employment[]>(`${this.baseUrl}/employments`);
  }
  getEmploymentListByUserId(currentUserId: number): Observable<Employment[]> {
    return this._http.get<Employment[]>(`${this.baseUrl}/employments/${currentUserId}`, {
      params: new HttpParams().set('userId', currentUserId)
    });
  }
  deleteEmployment(id: number): Observable<Employment> {
    return this._http.delete<Employment>(`${this.baseUrl}/employments`, {
      params: new HttpParams().set('employmentId', id)
    });
  }
}
