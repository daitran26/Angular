import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlAPI = environment.urlAPI;
  private categoryAPI = environment.urlAPI + '/api/category';
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<any>(`${this.urlAPI}/api/category/all`).pipe();
  }
  getCategoryById(id:number): Observable<Category> {
    return this.http.get<any>(`${this.urlAPI}/api/category/${id}`).pipe();
  }
  pageCategory(page:number,size: number): Observable<Category[]> {
    return this.http.get<any>(`${this.categoryAPI}/page?page=${page}&size=${size}`).pipe();
  }
  update(id:number,category:any):Observable<any>{
    const url = `${this.urlAPI}/api/category/${id}`;
      return this.http.put<any>(url,category).pipe();
  }
  add(category:any):Observable<any>{
    const url = `${this.urlAPI}/api/category/add`;
      return this.http.post<any>(url,category).pipe();
  }
  delete(id:number):Observable<any>{
    const url = `${this.urlAPI}/api/category/${id}`;
      return this.http.delete<any>(url).pipe();
  }
}
