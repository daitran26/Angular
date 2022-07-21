import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInOrder } from 'src/app/model/productinorder';
import { CartItemService } from 'src/app/services/cart-item.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product:any;
  id!:number;
  constructor(private productService: ProductService,
    private activatedRoute:ActivatedRoute,private cartItemService: CartItemService,private tokenService:TokenService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    })
    this.productService.getProductById(this.id).subscribe(data=> {
      this.product = data;
    })
  }
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
}
