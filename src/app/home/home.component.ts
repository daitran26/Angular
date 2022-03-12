import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { CartItemService } from '../services/cart-item.service';
import { CategoryService } from '../services/category.service';
import { DataShareService } from '../services/data-share.service';
import { ProductService } from '../services/product.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  shareProduct: Product[] = [];
  checkLogin = false;
  name = '';
  avatar='';
  id:any;
  searchText: string = '';
  user!:User;
  user1!:User;
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  myControl:FormControl = new FormControl();
  filteredOptions!: Observable<Product[]>;

  constructor(private tokenService: TokenService,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private dataShareService: DataShareService,
    private authService: AuthService,
    private cartItemService: CartItemService,
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data =>{
      this.categories = data;
    })
    if(this.tokenService.getToken()){
      this.checkLogin = true;
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
      this.user = JSON.parse(this.tokenService.getUser());
    }
    this.productService.getListProducts().subscribe(data =>{
      this.products = data;
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(map(value =>
      value.length < 2 ? [] : this.products.filter(product=> product.name.toLowerCase().includes(value.toLowerCase())).splice(0,5)
      ));
    this.cartItemService.total.subscribe(total => this.totalQuantity = total)
  }
  logOut(e:Event){
    e.preventDefault();
    this.tokenService.logout();
    this.router.navigate(['/']).then(()=>{window.location.reload()});
  }
  search(){
    console.log('button -->', this.searchText);
  }
  searchForm(e:any){
    this.searchText = e.target.value;
    console.log(e.target.value)
    this.productService.search(this.searchText).subscribe(data =>{
      this.shareProduct = data;
      this.dataShareService.passCreatedPostSource(this.shareProduct);
    })
  }
  update(value:any){
    this.authService.updateUser(JSON.parse(this.tokenService.getUser()).id, value).subscribe(data =>{
      if(data){
        alert("Cập nhật thông tin thành công")
        const current = JSON.parse(this.tokenService.getUser())
        this.user1 =
        new User(current.id, value.name,current.username,current.email,current.avatar,value.phone,value.address,current.roles);
        this.tokenService.setUser(this.user1);
        this.tokenService.setName(value.name);
        window.location.reload();
      }
    })
  }
  onChange(e:any){
    this.searchText = e.target.value;

  }
  updateCart(){
  }
}
