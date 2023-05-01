import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:4000/productList/", data)
  }
  getProduct(){
    return this.http.get<any>("http://localhost:4000/productList/");
  }
}

