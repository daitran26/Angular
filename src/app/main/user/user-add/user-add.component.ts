import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  product:any = {};
  role:any;
  selectedFile:any;
  checkUpLoad = false;
  ref!:AngularFireStorageReference; //AngularFireStorageReference
  downloadUrl:string = '';
  err1:any = {
    message: 'nouser'
  }
  err2:any = {
    message: 'noemail'
  }
  success ={
    message: 'Create success'
  }
  constructor(private activatedRoute:ActivatedRoute,
    private afStorage:AngularFireStorage,
    private alertService:AlertService,private router:Router,private authService: AuthService) { }

  ngOnInit(): void {
  }
  onFileChange($event:any){
    this.selectedFile = $event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile).then((snapshot:any) => {
      return snapshot.ref.getDownloadURL();//lấy về chuỗi url
    }).then((url:string) => {
      this.downloadUrl = url;
      this.product.avatar = url;
      this.checkUpLoad = false;
      console.log(url)
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
      this.product.avatar = url;
      this.checkUpLoad = false;
      return this.downloadUrl;
    }).catch((error:any) => {
      console.log("Upload false !!!!",error)
    })
  }
  save(){
    this.product.roles = [this.role]
    if(this.product.password != this.product.repassword){
      this.alertService.error("Mật khẩu không khớp !",{autoClose:true})
    }
    else{
      this.authService.signUp({
          name:this.product.name,
          username:this.product.username, password:this.product.password,email:this.product.email,
          avatar:this.product.avatar,
          roles:this.product.roles}).subscribe(data =>{
            if(JSON.stringify(data)==JSON.stringify(this.err1)){
              this.alertService.error('Tài khoản đã tồn tại',{autoClose:true})
            }
            if(JSON.stringify(data)==JSON.stringify(this.err2)){
              this.alertService.error('Email đã đăng ký ',{autoClose:true})
            }
            if(JSON.stringify(data)==JSON.stringify(this.success)){

              this.router.navigate(['/main/user'])
              this.alertService.success('Thêm thành công',{autoClose:true})
            }
      })
    }
    // this.authService.update(this.product.id,{
    //   name:this.product.name,
    //   avatar:this.product.avatar,
    //   phone:this.product.phone,
    //   address:this.product.address,
    //   roles:this.product.roles,
    // }).subscribe(data => {
    //   console.log(data)
    //   this.router.navigate(['main/user'])
    // },err => console.log(err))
    // console.log({
    //     name:this.product.name,
    //     avatar:this.product.avatar,
    //     phone:this.product.phone,
    //     address:this.product.address,
    //     roles:this.product.roles,
    //   });
  }

}
