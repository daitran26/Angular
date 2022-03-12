import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeAvatar } from 'src/app/model/change-avatar';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {
  form:any = {}
  changedAvatar!:ChangeAvatar;
  constructor(private authService:AuthService,
    private router:Router,
    private tokenService:TokenService) { }

  ngOnInit(): void {
  }
  error:any = {
    message: 'no'
  };
  success:any = {
    message: 'yes'
  };
  status = "Vui lòng chọn ảnh và upload";
  upload(e:any){
    this.form.avatar = e;
  }
  onSubmit(){
    this.changedAvatar = new ChangeAvatar(this.form.avatar);
    console.log(this.changedAvatar);
    this.authService.changeAvatar(this.changedAvatar).subscribe(data =>{
      if(JSON.stringify(data) == JSON.stringify(this.error)){
        this.status = "Bạn chưa chọn ảnh nào"
      }
      if(JSON.stringify(data) == JSON.stringify(this.success)){
        this.status = "Upload avatar successfully"
        this.tokenService.setAvatar(this.form.avatar)
        this.router.navigate(['/']).then(()=>{window.location.reload()});
      }
      console.log(data);
    },error => alert(error.message))
  }
}
