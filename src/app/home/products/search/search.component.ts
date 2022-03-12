import { Component, OnDestroy, OnInit,AfterContentChecked, DoCheck, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy,AfterContentChecked{

  page:any;
  check = false;
  keyword = '';
  private querySub!: Subscription;
  constructor(private productService: ProductService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.activatedRoute.queryParams.subscribe(() => {
      this.update();
    });
    this.keyword = this.activatedRoute.snapshot.queryParamMap.get('keyword') ?? '';
    this.getProds(1,4,this.keyword);
  }
  ngAfterContentChecked(){
    this.keyword = this.activatedRoute.snapshot.queryParamMap.get('keyword') ?? '';
  }
  update() {
    if (this.activatedRoute.snapshot.queryParamMap.get('page')) {
        const currentPage = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
        const size =  Number(this.activatedRoute.snapshot.queryParamMap.get('size'));
        this.getProds(currentPage, size, this.keyword);
    }
    else {
        this.getProds();
    }
}
  getProds(page: number = 1, size: number = 4,keyword:string='') {
    this.productService.searchPage(page,size,keyword).subscribe(data => {
      if(data.totalElements != 0){
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
  }
  counter(i = 1) {
    return new Array(i);
  }
}
