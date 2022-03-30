import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderStatus } from 'src/app/model/OrderStatus';
import { User } from 'src/app/model/user';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  page: any;
  orderStatus = OrderStatus;
  currentUser!: User;
  constructor(private orderService: OrderService,
              private activatedRoute:ActivatedRoute) { }

  querySub!: Subscription;

  ngOnInit(): void {
    this.querySub = this.activatedRoute.queryParams.subscribe(() => {
      this.update();
  });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
}
update() {
  let nextPage = 1;
  let size = 6;
  if (this.activatedRoute.snapshot.queryParamMap.get('page')) {
      nextPage = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
      size = Number(this.activatedRoute.snapshot.queryParamMap.get('size'));
  }
  this.orderService.getPage(nextPage, size).subscribe(page => {
      this.page = page;
      console.log(page)
    }
      , _ => {console.log("Get Order Failed")});
}


cancel(order: any) {
  this.orderService.cancel(order.id).subscribe(res => {
      if (res) {
          order.orderStatus = res.orderStatus;
      }
  });
}

finish(order: any) {
  this.orderService.finish(order.id).subscribe(res => {
      if (res) {
          order.orderStatus = res.orderStatus;
      }
  })
}
counter(i = 1) {
  return new Array(i);
}
}
