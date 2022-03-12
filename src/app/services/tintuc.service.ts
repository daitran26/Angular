import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TinTuc } from '../model/tintuc';

@Injectable({
  providedIn: 'root'
})
export class TintucService {
  private url = `${environment.urlAPI}/tintuc`
  constructor(private http:HttpClient) { }

  getList():Observable<TinTuc[]>{
    return this.http.get<any>(this.url).pipe();
  }
  getPage(page:number,size:number):Observable<TinTuc[]>{
    return this.http.get<any>(`${this.url}/page?page=${page}&size=${size}`).pipe();
  }
  getDetail(id:number):Observable<TinTuc>{
    return this.http.get<any>(`${this.url}/${id}`).pipe();
  }
  add(tinTuc:any):Observable<TinTuc>{
    return this.http.post<any>(`${this.url}/add`,tinTuc).pipe();
  }
  delete(id:number):Observable<TinTuc>{
    return this.http.delete<any>(`${this.url}/${id}`).pipe();
  }
  update(id:number,tinTuc:any):Observable<TinTuc>{
    return this.http.put<any>(`${this.url}/${id}`,tinTuc).pipe();
  }
}
