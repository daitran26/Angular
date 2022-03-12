import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category:any = {};
  constructor(private categoryService: CategoryService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.categoryService.getCategoryById(+this.activatedRoute.snapshot.url[1].path).subscribe(data => {
      this.category = data;
    })
  }
  save(){
    this.categoryService.update(+this.activatedRoute.snapshot.url[1].path,this.category).subscribe(data => {
      this.router.navigate(['main/category'])
    })
  }
}
