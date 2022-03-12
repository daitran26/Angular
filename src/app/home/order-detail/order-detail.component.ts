import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService, private activatedRoute:ActivatedRoute) { }
  order$!: Observable<any>;
  ngOnInit(): void {
    this.order$ = this.orderService.show(Number(this.activatedRoute.snapshot.paramMap.get('id')));
  }

}
