import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { TintucService } from 'src/app/services/tintuc.service';

@Component({
  selector: 'app-tintuc-add',
  templateUrl: './tintuc-add.component.html',
  styleUrls: ['./tintuc-add.component.css']
})
export class TintucAddComponent implements OnInit {
  tintuc:any = {}
  selectedFile:any;
  checkUpLoad = false;
  ref!:AngularFireStorageReference; //AngularFireStorageReference
  downloadUrl:string = '';
  constructor(private tintucService: TintucService,
    private afStorage:AngularFireStorage,
    private router:Router, private alertService: AlertService) { }

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
    this.tintucService.add(this.tintuc).subscribe(data => {
      this.router.navigate(['/main/tintuc'])
      this.alertService.success('Thêm thành công',options);
    },err => console.log(err))
  }
}
