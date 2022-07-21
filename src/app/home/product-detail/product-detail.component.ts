import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit ,OnDestroy {

  public product:any;
  private dataSub:Subscription= new Subscription();
  id:number = 0;
  constructor(private router:Router,
    private dataShareService:DataShareService
    ) {}

  ngOnInit(){
    this.dataSub = this.dataShareService.dataSource$.subscribe(data => {
      this.product = data;
    },err => console.log(err),
    ()=>console.log("successfully"))
  }
  ngOnDestroy(){
      this.dataSub.unsubscribe();
  }
}
