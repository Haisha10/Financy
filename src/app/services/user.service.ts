import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';

import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  login(credentials: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/login`, {
      params: new HttpParams().set('email', credentials.email).set('password', credentials.password)
    });
  }

  checkUserExists(email: string): Observable<boolean | null> {
    return this.http.get<any[]>(`${this.baseUrl}/users/check`, {
      params: new HttpParams().set('email', email)
    }).pipe(
      map((response: any[]) => {
        if (response.length > 0) {
          return true;
        } else if (response.length == 0) {
          return false;
        }
        return null;
      }),
      catchError((error: any) => {
        return of(null); // If error occur, return false;
      })
    ) as Observable<boolean | null>; // Cast to boolean
  }
}
