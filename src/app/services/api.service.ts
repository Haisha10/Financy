import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct(data : any){
    return this.http.post<any>("https://my-json-server.typicode.com/Haisha10/Financy/productList/", data)
  }
  getProduct(){
    return this.http.get<any>("https://my-json-server.typicode.com/Haisha10/Financy/productList/");
  }
}

