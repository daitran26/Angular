import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  page: any;
  private querySub!: Subscription;
  constructor(private categoryService: CategoryService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.querySub = this.activatedRoute.queryParams.subscribe(() => {
      this.update();
  });
  }
  update() {
    if (this.activatedRoute.snapshot.queryParamMap.get('page')) {
        const currentPage = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
        const size = Number(this.activatedRoute.snapshot.queryParamMap.get('size'));
        this.getProds(currentPage, size);
    } else {
        this.getProds();
    }
}

  getProds(page: number = 1, size: number = 4) {
    this.categoryService.pageCategory(+page, +size)
        .subscribe(page => {
            this.page = page;
        });

}
  counter(i = 1) {
    return new Array(i);
  }
  delete(id:any){
    let c = confirm("Bạn có muốn xóa danh mục này không ?");
        if (c) {
            this.categoryService.delete(id).subscribe(response => {
                if (response != null) {
                    console.log("Delete suceessfully")
                }
            },err => console.log(err))
            this.router.navigate(['/main/category'])
        }
  }
}
