import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject, Subscription, switchMap } from 'rxjs';
import { ProductInOrder } from 'src/app/model/productinorder';
import { CartItemService } from 'src/app/services/cart-item.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy,AfterContentChecked {

  constructor(private cartItemService: CartItemService,
              private tokenService:TokenService,
              private router:Router) { }
  productsInOrder:any = []
  total = 0;

  private updateTerms = new Subject<ProductInOrder>();
  sub!: Subscription;
  ngOnInit(): void {
    this.cartItemService.getCart().subscribe(data =>{
      this.productsInOrder = data;
      console.log(this.productsInOrder.length);
    })
    this.sub = this.updateTerms.pipe(
      debounceTime(300),
      // switch to new search observable each time the term changes
      switchMap((productInOrder: ProductInOrder) => this.cartItemService.update(productInOrder))
  ).subscribe(prod => {
          if (prod) { console.log("update success") }
      },
      _ => console.log('Update Item Failed'));
  }
  ngOnDestroy() {

  }
  ngAfterContentChecked(): void {
      this.total = this.productsInOrder.reduce(
        (total:any,cur:any)=> total + cur.count * cur.price,0)
  }
  addOne(productInOrder:any) {
    productInOrder.count++;
    this.updateTerms.next(productInOrder);
}

  minusOne(productInOrder:any) {
    productInOrder.count--;
    if(productInOrder.count < 1){
      productInOrder.count = 1;
    }
    this.updateTerms.next(productInOrder);
}

  onChange(productInOrder:any) {
    this.updateTerms.next(productInOrder);
}


remove(productInOrder: any) {
    this.cartItemService.remove(productInOrder).subscribe(
        success => {
           this.productsInOrder = this.productsInOrder.filter((e:any) => e.id !== productInOrder.id);
            console.log('Cart: ' + this.productsInOrder);
        },
        _ => console.log('Remove Cart Failed'));
}

checkout() {
      this.cartItemService.checkout().subscribe(
          _ => {
              this.productsInOrder = [];
          },
          error1 => {
              console.log('Checkout Cart Failed');
          });
      this.router.navigate(['/']);
  }
}
