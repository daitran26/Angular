import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AngularFireStorage,AngularFireStorageReference } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  categories:Category[] = [];
  categoryId:number = 0;
  selectedFile:any;
  checkUpLoad = false;
  ref!:AngularFireStorageReference; //AngularFireStorageReference
  downloadUrl:string = '';
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(private categoryService:CategoryService,
    private afStorage:AngularFireStorage,
    private productService:ProductService,
    private router:Router
    ) { }
    err:any = {
      message:"no"
    }
    err1:any = {
      message:"noavatar"
    }
    success:any = {
      message:"yes"
    }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories)
  }
  save(value: any){
    if(value.category == 0){
      alert("Please select a category")
    }
    else{
      value.category = this.categoryService.getCategoryById(this.categoryId).subscribe(data => {
        value.category = data
        value.image = this.downloadUrl;
        console.log(value)
        this.productService.addProduct(value).subscribe(data => {
          console.log(data)
          if(JSON.stringify(data) == JSON.stringify(this.err)){
            alert("Bạn chưa đăng nhập");
          }
          if(JSON.stringify(data) == JSON.stringify(this.err1)){
            alert("Bạn cần chọn ảnh");
          }
          if(JSON.stringify(data) == JSON.stringify(this.success)){
            alert("Thêm thành công");
            this.router.navigate(['/main/product'])
            console.log("Insert successfully");
          }
        });
      })

    }
  }
  onFileChange($event:any){
    this.selectedFile = $event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile).then((snapshot:any) => {
      return snapshot.ref.getDownloadURL();//lấy về chuỗi url
    }).then((url:string) => {
      this.downloadUrl = url;
      this.checkUpLoad = false;
      return this.downloadUrl;
    }).catch((error:any) => {
      console.log("Upload false !!!!",error)
    })
  }
  onUpload(){
    this.checkUpLoad = true;
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile).then((snapshot:any) => {
      return snapshot.ref.getDownloadURL();//lấy về chuỗi url
    }).then((url:string) => {
      this.downloadUrl = url;
      this.checkUpLoad = false;
      return this.downloadUrl;
    }).catch((error:any) => {
      console.log("Upload false !!!!",error)
    })
  }
  onChange(){
    console.log(this.categoryId)
  }
}
