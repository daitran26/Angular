import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject, Subscription, switchMap } from 'rxjs';
import { ProductInOrder } from 'src/app/model/productinorder';
import { CartItemService } from 'src/app/services/cart-item.service';
import { TokenService } from 'src/app/services/token.service';
import {
  PayPalScriptService, IPayPalConfig, ICreateOrderRequest
} from 'ngx-paypal';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy,AfterContentChecked {

  constructor(private cartItemService: CartItemService,
              private tokenService:TokenService,
              private router:Router,
              private modalService: BsModalService,
              private spiner:NgxSpinnerService,
              private alertService: AlertService,
              private productService: ProductService) { }
  productsInOrder:any = []
  total = 0;
  public payPalConfig?: IPayPalConfig;
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
      this.initConfig();
      // this.spiner.show()
  }
  ngOnDestroy() {

  }
  ngAfterContentChecked(): void {
      this.total = this.productsInOrder.reduce(
        (total:any,cur:any)=> total + cur.count * cur.price,0)
  }
  addOne(productInOrder:any) {
    productInOrder.count++;
    this.productService.getProductById(productInOrder.id).subscribe(data=>{
      if(productInOrder.count > data.soluong){
        this.alertService.error("Sản phẩm không còn đủ số lượng",{autoClose: true})
        productInOrder.count--;
      }
      else{
        this.updateTerms.next(productInOrder);
      }
    })
}

  minusOne(productInOrder:any) {
    productInOrder.count--;
    if(productInOrder.count < 1){
      productInOrder.count = 1;
    }
    this.updateTerms.next(productInOrder);
}

  onChange(productInOrder:any) {
    this.productService.getProductById(productInOrder.id).subscribe(data=>{
      if(productInOrder.count > data.soluong){
        this.alertService.error("Sản phẩm không còn đủ số lượng",{autoClose: true})
        productInOrder.count = 1;
      }
      this.updateTerms.next(productInOrder);
    })
}

err :any = {
  message: 'false'
}
remove(productInOrder: any) {
  let c = confirm("Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng?");
        if (c) {
    this.cartItemService.remove(productInOrder).subscribe(
        success => {
           this.productsInOrder = this.productsInOrder.filter((e:any) => e.id !== productInOrder.id);
            console.log('Cart: ' + this.productsInOrder);
        },
        _ => console.log('Remove Cart Failed'));}
}

checkout() {
      const user = JSON.parse(window.localStorage.getItem("User-Key") || '')
      if(user.phone == null){
        this.alertService.warn("Bạn chưa cập nhật thông tin cá nhân",{autoClose: true});
      }
      else{
        this.cartItemService.checkout().subscribe(
          data => {
              this.productsInOrder = [];
              this.router.navigate(['/']);
              this.alertService.success("Đặt hàng thành công",{autoClose: true})
          },
          error1 => {
              console.log('Checkout Cart Failed');
              this.alertService.warn("Thất bại",{autoClose: true})
          });
      }
  }
  getListItem():any[]{
    const items:any[] = [];
    let item = {}
    this.productsInOrder.forEach((it:any) =>{
      item = {
        name: it.name,
        quantity: it.count,
        unit_amount: {
          value: (it.price/23000).toFixed(2),
          currency_code: 'USD',
        }
      }
      items.push(item);
    })
    console.log(items);
    return items;
  }
  modalRef?: BsModalRef;

  @ViewChild('template') deleteModal:any;

  payments:any;
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'AQuL1jrWsTDoT3HyBIv6WR7qAce9iEuf2k9O9LrAV9yLyreelp3iS7t7czkmTNSgPm0OAOY4wyAzDrqR',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: (this.total/23000).toFixed(2).toString(), //(this.total/23000).toFixed(2).toString()
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: (this.total/23000).toFixed(2).toString()
                        }
                    }
                },
                items: this.getListItem(),
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
          this.spiner.show();
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // this.showSuccess = true;
            this.payments = data;
            console.log("Thanh toán info" , this.payments)
            this.cartItemService.checkout1().subscribe(data => {
              console.log("success")
            },err => console.log(err));
            this.productsInOrder = [];
            this.openModal();
            this.spiner.hide();
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
  }
  openModal() {
    this.modalRef = this.modalService.show(this.deleteModal, {class: 'modal-md'});
  }
  decline(): void {
    this.modalRef?.hide();
  }
}
