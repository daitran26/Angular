import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html'
})
export class CartDetailComponent implements OnInit {

  cart: Cart[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(){
    this.cart = this.cartService.cart;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.cartTotals();
  }

  increasingQuantity(theCartItem: Cart){
    this.cartService.addtocart(theCartItem);
  }

  decreasingQuantity(theCartItem: Cart){
    this.cartService.decreasingQuantity(theCartItem);
  }

  removeItem(theCartItem: Cart){
    this.cartService.remove(theCartItem);
  }

}
