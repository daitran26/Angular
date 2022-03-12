import { Component, OnInit,Output,EventEmitter } from '@angular/core';
// import { AngularFireStorage,AngularFireStorageReference} from '@angular/fire/compat/storage';
import { AngularFireStorage,AngularFireStorageReference } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {
  selectedFile!:File;
  checkUpLoad = false;
  ref!:AngularFireStorageReference; //AngularFireStorageReference
  downloadUrl:string = '';
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  constructor(
    private afStorage:AngularFireStorage,
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  onFileChange($event:any){
    this.selectedFile = $event.target.files[0];
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
      this.giveURLtoCreate.emit(this.downloadUrl);
      return this.downloadUrl;
    }).catch((error:any) => {
      console.log("Upload false !!!!",error)
    })
  }
}
