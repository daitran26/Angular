import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderApi = `${environment.urlAPI}/order/order`;
  constructor(private http: HttpClient) { }
  getPage(page = 1, size = 10): Observable<any> {
    return this.http.get(`${this.orderApi}?page=${page}&size=${size}`).pipe();
  }

  show(id:number): Observable<any> {
      return this.http.get<any>(`${this.orderApi}/${id}`).pipe();
  }

  cancel(id:number): Observable<Order> {
      return this.http.patch<Order>(`${this.orderApi}/cancel/${id}`, null).pipe();
  }

  finish(id:number): Observable<Order> {
      return this.http.patch<Order>(`${this.orderApi}/finish/${id}`, null).pipe();
  }
  getAll():Observable<any>{
    return this.http.get<any>(`${environment.urlAPI}/order/all`).pipe();
  }
  finishp(id:number): Observable<Order> {
    return this.http.put<Order>(`${this.orderApi}/finishp/${id}`, null).pipe();
}
}
