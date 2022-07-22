import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-banchay',
  templateUrl: './banchay.component.html'
})
export class BanchayComponent implements OnInit {
  order:any = [];
  order2:any = [];
  count = 0;
  counter = 0;
  user:String[] = [];
  currentMonth:number = 0;
  product: any = [];
  product2:any = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe(data=>{
      this.order = data;
      this.order2 = this.order.filter((order:any)=>{
        return order.orderStatus === 1
      })
      //sp ban chay
      this.order2.map((order:any)=>{
        order.products.map((product:any)=>{
          this.product.push(product);
        })
      })
        for(let x=0; x<this.product.length; x++){
          for(let i= 0; i<this.product.length-1; i++) {
            for(let j=i+1; j<this.product.length; j++){
              if(this.product[i]?.id == this.product[j]?.id){
                this.product[i].count += this.product[j]?.count
                this.product.splice(j,1)
              }
            }
          }
        }
        var title:any = []
        var count1:any=[]
        this.product.sort((a:any, b:any) => parseInt(b.count) - parseInt(a.count));
        this.product2 = this.product.slice(0,5)
        this.product.slice(0,5).map((product:any)=>title.push(product.name))
        this.product.slice(0,5).map((product:any)=>count1.push(product.count))
      this.count = this.order.filter((order:any)=>order.orderStatus === 0).length;
      this.order.map((order:Order)=>{
        this.user.push(order.buyerEmail);
      })
      var myLineChart = new Chart("chart-line", {
        type: 'polarArea',
        data: {
            labels: title,
            datasets: [{
                data: count1,
                backgroundColor: [
                  "rgba(255, 0, 0, 0.5)",
                  "rgba(100, 255, 0, 0.5)",
                  "rgba(200, 50, 255, 0.5)",
                  "rgba(0, 100, 255, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                ]
            }]
        },
        options: {
            title: {
                display: false,
                text: 'Weather'
            },
            scales: {
              xAxes: [{
                  gridLines: {
                    lineWidth: 0,
                      color: "rgba(0, 0, 0, 0)",
                      drawOnChartArea: true
                  }
              }],
              yAxes: [{
                  gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                  }
              }]
          }
        }
    });
    })

  }
}

