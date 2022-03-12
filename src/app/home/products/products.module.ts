import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { SortPriceComponent } from './sort-price/sort-price.component';
import { SearchComponent } from './search/search.component';
export const productRoutes: Routes = [
  {path: '',component:ProductsComponent,children: [
    {path:'category/:id',component:ProductCategoryComponent},
    {path:'product-detail/:id',component:ProductDetailComponent},
    {path:'sort-price',component:SortPriceComponent},
    {path:'search',component:SearchComponent},
  ]},
]


@NgModule({
  declarations: [
    ProductCategoryComponent,
    ProductDetailComponent,
    PaginationComponent,
    SortPriceComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(productRoutes)
  ]
})
export class ProductsModule { }
