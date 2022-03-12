import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangeAvatar } from '../model/change-avatar';
import { ChangePassword } from '../model/change-password';
import { JwtRespone } from '../model/JwtRespone';
import { SignInForm } from '../model/SignInForm';
import { SignUpForm } from '../model/signUpForm';
import { TokenDto } from '../model/TokenDto';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SIGN_UP = environment.urlAPI + '/api/auth/signup';
  private SIGN_IN = environment.urlAPI + '/api/auth/signin';
  private CHANGE_AVATAR = environment.urlAPI + '/api/auth/change-avatar';
  private CHANGE_PASSWORD = environment.urlAPI + '/api/auth/change-password';
  private GET_USER = environment.urlAPI + '/api/auth/getuser';
  private LOGIN_GOOGLE = environment.urlAPI + '/api/auth/google';
  // http://localhost:8080/api/auth/google
  constructor(private http: HttpClient) { }

  signin(signin:SignInForm):Observable<JwtRespone>{
    return this.http.post<any>(this.SIGN_IN,signin);
  }
  changeAvatar(avatar:ChangeAvatar):Observable<ChangeAvatar>{
    return this.http.put<ChangeAvatar>(this.CHANGE_AVATAR,avatar);
  }

  signUp(signUpForm:SignUpForm):Observable<any>{
    return this.http.post<any>(this.SIGN_UP,signUpForm);
  }
  getUser(username:any):Observable<any>{
    return this.http.get(this.GET_USER,username);
  }
  updateUser(id:number,value:any):Observable<any>{
    return this.http.put(`${environment.urlAPI}/api/auth/update/${id}`,value);
  }
  changePassword(password:ChangePassword):Observable<ChangePassword>{
    return this.http.put<ChangePassword>(this.CHANGE_PASSWORD,password);
  }
  loginGoogle(tokenDto:TokenDto):Observable<any>{
    return this.http.post(this.LOGIN_GOOGLE,tokenDto,cabecera).pipe();
  }
}
