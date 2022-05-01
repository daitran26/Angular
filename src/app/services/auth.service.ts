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
import { User } from '../model/user';

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
  private RESET_PASSWORD = environment.urlAPI + '/api/auth/reset-password';
  // http://localhost:8080/api/auth/google
  constructor(private http: HttpClient) { }

  signin(signin:SignInForm):Observable<JwtRespone>{
    return this.http.post<any>(this.SIGN_IN,signin);
  }
  changeAvatar(avatar:ChangeAvatar):Observable<ChangeAvatar>{
    return this.http.put<ChangeAvatar>(this.CHANGE_AVATAR,avatar);
  }

  signUp(signUpForm:any):Observable<any>{
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
  resetPassword(email:string):Observable<any>{
    return this.http.post(this.RESET_PASSWORD,{username: email},cabecera).pipe();
  }
  doResetPassword(password: string, code: string): Observable<any> {
    return this.http.post(`${environment.urlAPI}/api/auth/do-reset-password`, {
      password: password,
      code: code
    }, cabecera);
  }
  pageUser(page: number, size: number): Observable<User[]>{
    const url = `${environment.urlAPI}/api/auth/user?page=${page}&size=${size}`;
    // http://localhost:8080/api/product/page?page=3
    return this.http.get<any>(url).pipe();
  }
  getUserById(id:any):Observable<User>{
    return this.http.get<any>(`${environment.urlAPI}/api/auth/user/${id}`).pipe();
  }
  deleteUser(id:any):Observable<any>{
    return this.http.delete<any>(`${environment.urlAPI}/api/auth/delete/${id}`).pipe();
  }
  update(id:number,user:any):Observable<any>{
    return this.http.put<any>(`${environment.urlAPI}/api/auth/change-role/${id}`,user).pipe();
  }
  usercode(code:any):Observable<any>{
    return this.http.get<any>(`${environment.urlAPI}/api/auth/usercode/${code}`);
  }
}
