import { ProductInOrder } from "./productinorder";

export class CartItem{
  cartId: number;
  products: ProductInOrder[];
  constructor(cartId: number, products: ProductInOrder[]){
    this.cartId = cartId;
    this.products = products;
  }
}
