import { Injectable } from '@angular/core';
import { User } from '../model/user';
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
const AVATAR_KEY = 'Avatar-Key';
const USER_KEY = 'User-Key';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: string[] = [];
  constructor() { }
  public setToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken():string {
    return window.localStorage.getItem(TOKEN_KEY) ?? '';
  }
  public setName(name:string){
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.setItem(NAME_KEY, name);
  }
  public getName():string {
    return window.localStorage.getItem(NAME_KEY) ?? '';
  }
  public setRoles(roles:string[]){
    window.localStorage.removeItem(ROLE_KEY);
    window.localStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }

  public getRoles():string[]{
    this.roles = [];
    if(localStorage.getItem(TOKEN_KEY)){
      JSON.parse(localStorage.getItem(ROLE_KEY)??'').forEach((role:any) => {
        this.roles.push(role.authority)
      });
    }
    return this.roles;
  }
  public setAvatar(avatar:string){
    window.localStorage.removeItem(AVATAR_KEY);
    window.localStorage.setItem(AVATAR_KEY, avatar);
  }
  public getAvatar():string {
    return window.localStorage.getItem(AVATAR_KEY) ?? '';
  }
  logout() {
    window.localStorage.clear();
    window.location.reload();
  }
  public setUser(user:User){
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(){
    return window.localStorage.getItem(USER_KEY) ?? '';
  }
}
