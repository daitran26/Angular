export class Product {
    id:number;
    name:string;
    image:string;
    price:number;
    title:string;
    description:string;
    categoryid:any;
    constructor(id:number, name:string, image:string, price:number,title:string,description:string,categoryid:any) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.price = price;
      this.title = title;
      this.description = description;
      this.categoryid = categoryid;
    }
}
