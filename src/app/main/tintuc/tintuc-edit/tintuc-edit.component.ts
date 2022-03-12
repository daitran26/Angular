import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { TintucService } from 'src/app/services/tintuc.service';

@Component({
  selector: 'app-tintuc-edit',
  templateUrl: './tintuc-edit.component.html',
  styleUrls: ['./tintuc-edit.component.css']
})
export class TintucEditComponent implements OnInit {
  tintuc:any = {};
  selectedFile:any;
  checkUpLoad = false;
  ref!:AngularFireStorageReference; //AngularFireStorageReference
  downloadUrl:string = '';
  constructor(private tintucService: TintucService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private afStorage:AngularFireStorage,private alertService: AlertService) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.tintucService.getDetail(params['id']).subscribe(data=>{
        this.tintuc = data;
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
      this.tintuc.image = url;
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
    this.tintucService.update(+this.activatedRoute.snapshot.url[1].path,this.tintuc).subscribe(data => {
      this.router.navigate(['main/tintuc'])
      this.alertService.success('Sửa tin tức thành công!',options);
    },err => console.log(err))
  }
}
