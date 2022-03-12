import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../model/CartItem';
import { Item } from '../model/item';
import {JwtRespone} from '../model/JwtRespone';
import { ProductInOrder } from '../model/productinorder';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private cartApi = `${environment.urlAPI}/cart`;
  constructor(private http: HttpClient) {
                this.itemsSubject = new BehaviorSubject<Item[]>([]);
                this.items = this.itemsSubject.asObservable();
                this.totalSubject = new BehaviorSubject<number>(0);
                this.total = this.totalSubject.asObservable();
                // this.currentUser = JSON.parse(this.tokenService.getUser());
               }
  localMap = {}
  private itemsSubject!: BehaviorSubject<Item[]>;
    private totalSubject!: BehaviorSubject<number>;
    public items!: Observable<Item[]>;
    public total!: Observable<number>;

    private currentUser!: User;
    getCart(): Observable<ProductInOrder[]> {
      return this.http.get<CartItem>(this.cartApi).pipe(map(cart => {
        this.totalSubject.next(cart.products.length);
        return cart.products
      }));
    }
    addItem(productInOrder:any): Observable<boolean> {
          const url = `${this.cartApi}/add`;
          return this.http.post<boolean>(url, {
              'quantity': productInOrder.count,
              'productId': productInOrder.productId
          });
      }
      update(productInOrder:any): Observable<ProductInOrder> {
          const url = `${this.cartApi}/${productInOrder.id}`;
          return this.http.put<ProductInOrder>(url, productInOrder.count);
    }
    remove(productInOrder:any) {
        const url = `${this.cartApi}/${productInOrder.id}`;
        return this.http.delete(url).pipe();
    }
    checkout(): Observable<any> {
      const url = `${this.cartApi}/checkout`;
      return this.http.post(url, null).pipe();
  }
}
