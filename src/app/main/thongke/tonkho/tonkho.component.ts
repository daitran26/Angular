import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as Chart from 'chart.js';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-tonkho',
  templateUrl: './tonkho.component.html'
})
export class TonkhoComponent implements OnInit {
  product:any = [];
  tonkhoo:any = [];
  total:any = 0;
  lable:any = []
  totalm:any = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getListResquest({page:0,size:10})
    this.productService.pageProduct1({page:0,size:10}).subscribe(res => {
      this.tonkhoo = res['content']
      for (let i = 0; i <this.tonkhoo.length; i++) {
        this.lable.push(this.tonkhoo[i].name)
        this.totalm.push(this.tonkhoo[i].soluong)
      }
      const myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: this.lable,
            datasets: [{
                label: "Doanh thu",
                data: this.totalm,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          legend: {
              display: false
          },
          animation: {
            duration:1000,
            easing:'easeOutSine',
            onComplete:(chart:any)=> {
            }
          }
        }
      });
    })
  }
  private getListResquest(request:any){
    this.productService.pageProduct1(request).subscribe(data => {
      this.product = data['content']
      this.total = data['totalElements']
    },err => console.log(err))
  }
  nextPage(event:PageEvent){
    const request:any = {}
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
  }
}
