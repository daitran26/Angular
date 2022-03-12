import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();

  constructor() { }

  addtocart(theCartItem:Cart) {
    let alreadyExistInCart: boolean = false;
    let exsitingCartItem: Cart = undefined!;

    if (this.cart.length > 0) {
      exsitingCartItem = this.cart.find(tempCartItem => tempCartItem.id === theCartItem.id)!;
      alreadyExistInCart = (exsitingCartItem != undefined);
    }

    if(alreadyExistInCart) {
      exsitingCartItem.quantity++;
    } else {
      this.cart.push(theCartItem);
    }

    this.cartTotals();
  }

  cartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cart) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.price;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue)
  }

  cartData(totalPriceValue: number, totalQuantityValue:number){
    console.log('Noi dung trong gio hang');

    for (let tempCartItem of this.cart) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.price;
      console.log(`name:${tempCartItem.name},quantity=${tempCartItem.quantity},price=${tempCartItem.price}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
  }

  decreasingQuantity(theCartItem: Cart) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.cartTotals();
    }
  }

  remove(theCartItem: Cart){
    const itemIndex = this.cart.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);

    if (itemIndex > -1){
      this.cart.splice(itemIndex, 1);
      this.cartTotals();
    }
  }
}
