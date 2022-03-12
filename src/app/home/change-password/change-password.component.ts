import { Component, OnInit } from '@angular/core';
import { ChangePassword } from 'src/app/model/change-password';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide=true
  form:any = {};
  changePassword!:ChangePassword;
  status = 'Vui lòng nhập đầy đủ các trường để thay đổi mật khẩu';
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  err1:any = {
    message:"password invalid"
  }
  success:any = {
    message:"yes"
  }
  onSubmit(){
    if(this.form.newpass == this.form.newpass1){
      this.changePassword = new ChangePassword(this.form.oldpass,this.form.newpass);
      this.authService.changePassword(this.changePassword).subscribe(data =>{
        if(data!=null && JSON.stringify(data) == JSON.stringify(this.err1)){
          this.status = 'Mật khẩu cũ không đúng.Vui lòng nhập lại'
        }
        if(data!=null && JSON.stringify(data) == JSON.stringify(this.success)){
          this.status = 'Thay đổi mật khẩu thành công'
        }
      })
    }
    else{
      this.status = 'Mật khẩu nhập lại không khớp.Vui lòng nhập lại'
    }
    // this.authService.changePassword()
  }
}
