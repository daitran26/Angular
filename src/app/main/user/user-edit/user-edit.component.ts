import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  product:any = {};
  role:any;
  selectedFile:any;
  checkUpLoad = false;
  ref!:AngularFireStorageReference; //AngularFireStorageReference
  downloadUrl:string = '';
  constructor(private activatedRoute:ActivatedRoute,
    private afStorage:AngularFireStorage,
    private alertService:AlertService,private router:Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.authService.getUserById(params['id']).subscribe(user=>{
        this.product = user;
        console.log(user)
      })
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
    var options = {
      autoClose: true,
      keepAfterRouteChange: false
    };
    this.product.roles = [this.role]
    this.authService.update(this.product.id,{
      name:this.product.name,
      avatar:this.product.avatar,
      phone:this.product.phone,
      address:this.product.address,
      roles:this.product.roles,
    }).subscribe(data => {
      console.log(data)
      this.router.navigate(['main/user'])
    },err => console.log(err))
    console.log({
        name:this.product.name,
        avatar:this.product.avatar,
        phone:this.product.phone,
        address:this.product.address,
        roles:this.product.roles,
      });
  }

}
