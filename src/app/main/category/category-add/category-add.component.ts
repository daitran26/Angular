import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  category:any = {}
  constructor(private categoryService:CategoryService, private router:Router,private alertService:AlertService) { }


  ngOnInit(): void {
  }
  save(){
    var options = {
      autoClose: true,
      keepAfterRouteChange: false
    };
    this.categoryService.add(this.category).subscribe(data => {
      this.router.navigate(['/main/category'])
      this.alertService.success('Thêm danh mục thành công',options);
    })
  }
}
