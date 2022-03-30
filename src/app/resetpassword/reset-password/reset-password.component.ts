import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { TokenDto } from 'src/app/model/TokenDto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  socialUser!: SocialUser;
  userLogged!: SocialUser;
  isLogged= false;
  checkAccount: boolean = true;
  registerForm!: FormGroup;
  status = '';
  form:any = {}
  submitted = false;
  type:any;
  err:any = {
    message: 'invalid user'
  }
  success ={
    message: 'Sent email'
  }
  emailFormControl:FormControl = new FormControl('',[
    Validators.required,
    Validators.email
  ]);
  constructor(private authService:AuthService,
    private tokenService:TokenService,
    private router:Router,
    private socialAuthService: SocialAuthService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    }
    );
    this.isLogged= false;
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    if (this.registerForm.valid) {
      this.isLogged = true;
      this.authService.resetPassword(this.registerForm.value.email).subscribe(data=>{
        console.log(data);
        if(JSON.stringify(data)==JSON.stringify(this.err)){
          this.checkAccount = false;
          this.isLogged = false;
          this.type = 'danger'
          this.status = "Sai email hoặc email chưa được đăng ký!"
        }
        if(JSON.stringify(data)==JSON.stringify(this.success)){
          this.isLogged = false;
          this.checkAccount = false;
          this.type = 'success'
          this.status = 'Đã gửi email xác nhận. Vui lòng kiểm tra email để thay đổi mật khẩu'
        }
      },err=>{
        this.checkAccount = false;
        this.isLogged = false;
        this.type = 'danger'
        this.status = "Sai email hoặc email chưa được đăng ký!"
      })
    }
  }
  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data=>{
      console.log(data)
      this.socialUser = data;
      this.isLogged = true;
      const tokenDto = new TokenDto(this.socialUser.idToken);
      this.authService.loginGoogle(tokenDto).subscribe(data=>{
        console.log(data)
        this.checkAccount = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setAvatar(data.avatar);
        this.tokenService.setRoles(data.roles);
        this.tokenService.setUser(data.user);
        this.router.navigate(['/']);
      },err => console.log(err))
    })
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
