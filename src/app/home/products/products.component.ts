import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  form:any = {};
  constructor(private router:Router,private dataShareService:DataShareService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.dataShareService.passDataObject(this.form);
    this.router.navigate(['product/sort-price'])
  }
}
