import { Component, EventEmitter, OnInit, Output,Input,ViewChild } from '@angular/core';
import { ProductComponent } from '../../home/product/product.component';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { DataShareService } from 'src/app/services/data-share.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categories: Category[] = [];
  @Input() text:string = ''

  setText(text:string) {
    this.text = text;
  }
  constructor(private productService:ProductService,
    private categoryService:CategoryService,
    private dataShareService:DataShareService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories =>{
      this.categories = categories;
    })
  }
  // @Output() getProducts = new EventEmitter<number>();

  // load(id:number){
  //   this.getProducts.emit(id);
  // }
  // @ViewChild(ProductComponent)
  // private productComponent: ProductComponent = new ProductComponent(this.productService,this.dataShareService);
  load(id:number){
    // this.productComponent.load(id);
  }
}
