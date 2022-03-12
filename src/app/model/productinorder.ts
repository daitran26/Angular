import {Product} from './product'
export class ProductInOrder {
    productId: number;
    productName: string;
    productPrice: number;
    productDescription: string;
    productIcon: string;
    categoryId: number;
    count: number;
    constructor(product:Product, quantity = 1){
      this.productId = product.id;
      this.productName = product.name;
      this.productPrice = product.price;
      this.productDescription = product.description;
      this.productIcon = product.image;
      this.categoryId = product.categoryid;
      this.count = quantity;
    }
}
