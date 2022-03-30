import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product:any = {};
  categories:Category[] = [];
  categoryId:any;
  selectedFile:any;
  checkUpLoad = false;
  ref!:AngularFireStorageReference; //AngularFireStorageReference
  downloadUrl:string = '';
  constructor(private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private afStorage:AngularFireStorage,
    private categoryService:CategoryService,private alertService:AlertService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.productService.getProductById(params['id']).subscribe(data=>{
        this.product = data;
        this.categoryId = this.product.category.id
      })
    })
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }
  onFileChange($event:any){
    this.selectedFile = $event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile).then((snapshot:any) => {
      return snapshot.ref.getDownloadURL();//lấy về chuỗi url
    }).then((url:string) => {
      this.downloadUrl = url;
      this.product.image = url;
      this.checkUpLoad = false;
      console.log(url)
      return this.downloadUrl;
    }).catch((error:any) => {
      console.log("Upload false !!!!",error)
    })
  }
  save(){
    var options = {
      autoClose: true,
      keepAfterRouteChange: false
    };
    this.categoryService.getCategoryById(+this.categoryId).subscribe(data=>{
      this.product.category = data;
      this.productService.update(+this.activatedRoute.snapshot.url[1].path,this.product).subscribe(data => {
        this.router.navigate(['main/product'])
        this.alertService.success('Sửa sản phẩm thành công!',options);
      },err => console.log(err))
    })
  }
}
