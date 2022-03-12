import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { ProductService } from 'src/app/services/product.service';
import {Subscription} from 'rxjs'
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit ,OnDestroy {

  public product:any;
  private dataSub:Subscription= new Subscription();
  id:number = 0;
  constructor(private router:Router, 
    private productService:ProductService,
    private activatedRoute: ActivatedRoute,
    private dataShareService:DataShareService
    ) {}

  ngOnInit(){
    // this.activatedRoute.params.subscribe(params => {
    //   this.id = params['id'];
    // })
    // this.productService.getProductById(this.id).subscribe(product => {
    //   this.product = product;
    // })
    this.dataSub = this.dataShareService.dataSource$.subscribe(data => {
      console.log(data)
      this.product = data;
    },err => console.log(err),
    ()=>console.log("successfully"))
  }
  ngOnDestroy(){
      this.dataSub.unsubscribe();
  }
}
