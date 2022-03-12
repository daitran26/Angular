import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sort-price',
  templateUrl: './sort-price.component.html',
  styleUrls: ['./sort-price.component.css']
})
export class SortPriceComponent implements OnInit ,OnDestroy{
  page:any;
  price:any = {};
  check = false;
  private querySub!: Subscription;
  private paramSub!: Subscription;
  constructor(private productService: ProductService,
    private activatedRoute:ActivatedRoute,
    private dataShareService: DataShareService ) { }

  ngOnInit(): void {
    this.dataShareService.dataObject$.subscribe(data => {
      this.price = data;
    })
    this.querySub = this.activatedRoute.queryParams.subscribe(() => {
      this.update();
    });
    this.paramSub = this.activatedRoute.params.subscribe(() => {
      this.update();
    });
  }
  update() {
    if (this.activatedRoute.snapshot.queryParamMap.get('page')) {
        const currentPage = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
        const size =  Number(this.activatedRoute.snapshot.queryParamMap.get('size'));
        if(this.activatedRoute.snapshot.queryParamMap.get('min')){
          const min = Number(this.activatedRoute.snapshot.queryParamMap.get('min'));
          const max =  Number(this.activatedRoute.snapshot.queryParamMap.get('max'));
          this.getProds(currentPage, size,min, max);
        }
        else{
        }
    }
    else {
        this.getProds(1,4,this.price.min,this.price.max);
    }
}
  getProds(page: number = 1, size: number = 4,min:number=0,max:number=0) {
    this.productService.sortPricePage(page,size,min,max).subscribe(data => {
      if(data.totalElements != 0){
        console.log(data)
        this.page = data;
        this.check = true;
      }
      else{
        this.check = false;
      }
    })
  }
  ngOnDestroy() {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  counter(i = 1) {
    return new Array(i);
  }
}
