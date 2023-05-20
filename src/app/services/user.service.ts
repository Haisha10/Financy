import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';

import { API_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = API_URL;

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, {
      params: new HttpParams().set('email', credentials.email).set('password', credentials.password)
    });
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, {
      params: new HttpParams().set('email', email)
    }).pipe(
      map((response: any[]) => {
        return response.length > 0; // If exists return true, else return false;
      }),
      catchError((error: any) => {
        return of(false); // If error occur, return false;
      })
    ) as Observable<boolean>; // Cast to boolean
  }
}
