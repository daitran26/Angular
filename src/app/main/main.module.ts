import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { ProductComponent } from '../main/product/product.component';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderComponent } from './order/order/order.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { TintucComponent } from './tintuc/tintuc/tintuc.component';
import { TintucAddComponent } from './tintuc/tintuc-add/tintuc-add.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CategoryComponent } from './category/category/category.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { TintucEditComponent } from './tintuc/tintuc-edit/tintuc-edit.component';
import { UserComponent } from './user/user/user.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';
import { BanchayComponent } from './thongke/banchay/banchay.component';
import { TonkhoComponent } from './thongke/tonkho/tonkho.component';

@NgModule({
  declarations: [
    MainComponent,
    ProductAddComponent,
    ProductComponent,
    OrderComponent,
    OrderDetailComponent,
    TintucComponent,
    TintucAddComponent,
    ProductEditComponent,
    CategoryComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    TintucEditComponent,
    UserComponent,
    UserAddComponent,
    UserEditComponent,
    HomeComponent,
    BanchayComponent,
    TonkhoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ModalModule.forRoot(),
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule { }
