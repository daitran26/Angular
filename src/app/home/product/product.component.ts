import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { ProductInOrder } from 'src/app/model/productinorder';
import { CartItemService } from 'src/app/services/cart-item.service';
import { DataShareService } from '../../services/data-share.service';
import { ProductService } from '../../services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TintucService } from 'src/app/services/tintuc.service';
import { TinTuc } from 'src/app/model/tintuc';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public products: any = [];
  tintucs:any;
  iphone: any = [];
  xiaomi: any = [];
  public categories: Category[] = [];
  searchText: string = '';
  public text: string = "đây là text ở component Product!!!";
  constructor(private productService:ProductService,
    private dataShareService:DataShareService,
    private cartItemService: CartItemService,
    private router: Router,
    private tintucService:TintucService,
    private tokenService:TokenService
  ) {}
  @Input() idCategory:number = 0;
  ngOnInit(): void {
    this.productService.findTop4().subscribe(response=>{
      this.products = response;
    })
    this.productService.getCategoryInPage(28,1,4).subscribe(response=>{
      this.iphone = response.content
    })
    this.productService.getCategoryInPage(29,1,4).subscribe(response=>{
      this.xiaomi = response.content
    })
    this.tintucService.getList().subscribe(data=>{
      this.tintucs = data;
    })
    }

  load(id:number) {
    this.productService.getProductByCategoryId(id).subscribe(response=>{
      this.products = response;
    })
  }
  productDetail(product:any):void {
    this.dataShareService.passData(product);
  }
  cartItem!:Cart;
  addToCart(product:any){
    if(this.tokenService.getToken() == ""){
      this.router.navigate(['/login'])
    }
    else{
      this.cartItemService.addItem(new ProductInOrder(product,1)).subscribe(data =>{
        console.log(data)
        if(!data){
          console.log('Add to cart failed');
          throw new Error('Add to cart failed');
        }
        else{
          this.router.navigate(['cart'])
        }
      },error=> console.log('Add to cart failed'+ error.message))
    }
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
