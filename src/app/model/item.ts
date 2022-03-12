import { Product } from "./product";

export class Item {
  quantity: number;
  product: Product

  constructor(quantity:number,product:Product) {
    this.quantity = quantity;
    this.product = product;
  }
}
