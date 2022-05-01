import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlAPI = environment.urlAPI;
  constructor(private http: HttpClient) { }

  getListProducts():Observable<Product[]>{
    return this.http.get<any>(`${this.urlAPI}/api/product/all`).pipe();
  }
  getProductById(id:number):Observable<any>{
    return this.http.get<any>(`${this.urlAPI}/api/product/${id}`).pipe();
  }
  getProductByCategoryId(id:number): Observable<Product[]>{
    return this.http.get<any>(`${this.urlAPI}`).pipe();
  }
  pageProduct(params:any){
    // const params = resquest; //params là biến cố định
    return this.http.get<any>(`${this.urlAPI}/api/product/page`,{params}).pipe();
  }
  addProduct(product: Product):Observable<Product>{
    return this.http.post<any>(`${this.urlAPI}/api/product/add`,product).pipe();
  }
  findTop4():Observable<Product[]>{
    return this.http.get<any>(`${this.urlAPI}/api/product/top4`).pipe();
  }
  paging(index:number):Observable<Product[]>{
    return this.http.get<any>(`${this.urlAPI}/api/product/paging?index=${index}`).pipe();
  }
  search(name: string): Observable<Product[]>{
    return this.http.get<any>(`${this.urlAPI}/api/product/search?name=${name}`).pipe();
  }
  sortPrice(min:number,max:number):Observable<Product[]>{
    return this.http.get<any>(`${this.urlAPI}/api/product/sort-price?min=${min}&max=${max}`).pipe();
  }

  ///////////////////////////////////////////////////////////////
  getAllInPage(page: number, size: number): Observable<any> {
    const url = `${this.urlAPI}/api/product/page?page=${page}&size=${size}`;
    // http://localhost:8080/api/product/page?page=3
    return this.http.get<any>(url).pipe();
}
// http://localhost:8080/api/product/category/28?page=2&size=6
  getCategoryInPage(categoryId: number, page: number, size: number): Observable<any> {
    const url = `${this.urlAPI}/api/product/category/${categoryId}?page=${page}&size=${size}`;
      // http://localhost:8080/api/product/page?page=3
      return this.http.get<any>(url).pipe();
  }
  pageAndSort(page: number, size: number,name: string,type:string):Observable<Product[]>{
    return this.http.get<any>(`${this.urlAPI}/api/product/page-sort?page=${page}&size=${size}&name=${name}&type=${type}`).pipe();
  }
  getCategoryInPageAndSort(categoryId: number, page: number, size: number,name: string,type:string): Observable<any> {
    const url = `${this.urlAPI}/api/product/category/${categoryId}?page=${page}&size=${size}&name=${name}&type=${type}`;
      // http://localhost:8080/api/product/page?page=3
      return this.http.get<any>(url).pipe();
  }
  sortPricePage(page: number, size: number,min: number,max:number): Observable<any> {
    const url = `${this.urlAPI}/api/product/sort-price?page=${page}&size=${size}&min=${min}&max=${max}`;
      // http://localhost:8080/api/product/page?page=3
      return this.http.get<any>(url).pipe();
  }
  // http://localhost:8080/api/product/search?name=iphone&page=2
  searchPage(page: number, size: number,name: string):Observable<any>{
    const url = `${this.urlAPI}/api/product/search?page=${page}&size=${size}&name=${name}`;
      return this.http.get<any>(url).pipe();
  }
  delete(id:number):Observable<any>{
    const url = `${this.urlAPI}/api/product/${id}`;
      return this.http.delete<any>(url).pipe();
  }
  update(id:number,product:any):Observable<any>{
    const url = `${this.urlAPI}/api/product/${id}`;
      return this.http.put<any>(url,product).pipe();
  }
}
