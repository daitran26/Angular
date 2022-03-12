import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInForm } from '../model/SignInForm';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { TokenDto } from '../model/TokenDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:any = {};
  signin!:SignInForm;
  checkAccount: boolean = true;

  socialUser!: SocialUser;
  userLogged!: SocialUser;
  isLogged!: Boolean;

  constructor(private authService:AuthService,
              private tokenService:TokenService,
              private router:Router,
              private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(data=>{
      this.userLogged = data
      this.isLogged = (this.userLogged != null);
    })
  }
  onSubmit(){
    this.signin = new SignInForm(this.form.username, this.form.password);
    this.authService.signin(this.signin).subscribe(data=>{
      if(data.token!=undefined){
        this.checkAccount = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setAvatar(data.avatar);
        this.tokenService.setRoles(data.roles);
        this.tokenService.setUser(data.user);
        console.log(data.roles[0].authority);//authority
        if(data.roles[0].authority == 'USER'){
          this.router.navigate(['/']).then(() => {window.location.reload();})
        }
        else if(data.roles[0].authority == 'ADMIN'){
          this.router.navigate(['/main']).then(() => {window.location.reload();})
        }
      }
      else{
        this.checkAccount = false;
      }
    },error=>console.log("login-->",error))
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
