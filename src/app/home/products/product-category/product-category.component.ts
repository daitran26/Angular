import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductInOrder } from 'src/app/model/productinorder';
import { CartItemService } from 'src/app/services/cart-item.service';
import { CategoryService } from 'src/app/services/category.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit,OnDestroy {
  title='';
  id:any;
  sort: any;
  dataSub:Subscription = new Subscription();
  form:any = {}


  page:any;
  private querySub!: Subscription;
  private paramSub!: Subscription;

  constructor(private productService: ProductService,
    private activatedRoute:ActivatedRoute,
    private categoryService: CategoryService,
    private dataShareService: DataShareService,
    private cartItemService: CartItemService,
    private tokenService:TokenService,
    private router:Router) { }

  ngOnInit(): void {
    this.querySub = this.activatedRoute.queryParams.subscribe(() => {
      this.update();
    });
    this.paramSub = this.activatedRoute.params.subscribe(() => {
      this.update();
    });
  }
  update() {
    if (this.activatedRoute.snapshot.queryParamMap.get('page')) {
        const currentPage = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
        const size =  Number(this.activatedRoute.snapshot.queryParamMap.get('size'));
        if(this.activatedRoute.snapshot.queryParamMap.get('type')&&this.activatedRoute.snapshot.queryParamMap.get('name')){
          const name = this.activatedRoute.snapshot.queryParamMap.get('name');
          const type =  this.activatedRoute.snapshot.queryParamMap.get('type');
          this.getProds(currentPage, size, name?.toString(), type?.toString());
        }
        else{
          this.getProds(currentPage, size,'id','ASC');
        }
    }
    else {
        this.getProds();
    }
}

  getProds(page: number = 1, size: number = 4, name:string = 'id', type:string = 'ASC',min:number=0,max:number=0) {
    const typeUrl = this.activatedRoute.snapshot.url[1].path;
    if(typeUrl == 'all'){
        this.productService.pageAndSort(page,size,name,type).subscribe(data => {
          this.page = data
        });
        this.title = 'ALL PRODUCT'
    }
    else{
      this.productService.getCategoryInPageAndSort(+typeUrl,page,size,name,type).subscribe(data =>{
        this.page = data;
      })
      this.categoryService.getCategoryById(+typeUrl).subscribe(data =>{
        this.title = data.name;
      })
    }
  }
  ngOnDestroy() {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }
  onChange(e:any){
    this.sort = {
      name: e.target.value.split(',')[0],
      type: e.target.value.split(',')[1]
    }
    this.getProds(1,4,this.sort.name,this.sort.type);
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
