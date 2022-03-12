import { User } from "./user";

export class JwtRespone{
  public token:string;
  public type:string;
  public name:string;
  public avatar:string;
  public user:User;
  public roles:any;
  constructor(token:string,type:string,name:string,avatar:string,user:User,roles:any){
    this.token = token;
    this.type = type;
    this.name = name;
    this.avatar = avatar;
    this.user = user;
    this.roles = roles;
  }
}
