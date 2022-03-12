export class User{
  id:number;
	name:String;
	username:String;
  email:String;
	avatar:String;
  phone:String;
	address:String;
  roles:any;
  constructor(id:number,name:String,username:String,email:String,avatar:String,phone:String,address:String,roles:any) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.phone = phone;
    this.address = address;
    this.roles = roles;
  }
}
