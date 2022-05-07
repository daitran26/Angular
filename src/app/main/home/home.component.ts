import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  order:any = [];
  order2:any = [];
  totalYear:number = 0;
  totalMonth:any = [];
  count = 0;
  counter = 0;
  user:String[] = [];
  totalCurrMonth:number = 0;
  currentMonth:number = 0;
  product: any = [];
  product2:any = [];
  date:any = {};
  constructor(private orderService: OrderService,private router:Router,private modalService: BsModalService) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe(data=>{
      console.log(data)
      this.order = data;
      this.order2 = this.order.filter((order:any)=>{
        return order.orderStatus === 1
      })
      this.totalYear = this.order2.reduce((total:any, curr:any)=> total + curr.orderAmount,0)
      for(let i= 1; i<=12; i++) {
        this.totalMonth.push(this.order.filter((order:any)=>{
          return (((new Date(order.updateTime)).getMonth()+1) == i) && (order.orderStatus === 1)
        }).reduce((total:any, curr:any)=>total + curr.orderAmount,0))
      }
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
      //số khách hàng
      this.counter = (new Set(this.user)).size;
      this.currentMonth = new Date().getMonth() + 1
      this.totalCurrMonth = this.order2.filter((order:any)=>((new Date(order.updateTime)).getMonth()+1)== this.currentMonth).reduce((total:any, curr:any)=>total + curr.orderAmount,0)
      var lable = [];
      for(let i= 1; i<=12; i++) {
        lable.push('Tháng ' + i);
      }
      const myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: lable,
            datasets: [{
                label: "Doanh thu",
                data: this.totalMonth,
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
  modalRef?: BsModalRef;

  @ViewChild('template') deleteModal:any;
  thongke:any = []
  time = new Date();
  tong:any = 0;
  submit(){
    this.thongke = []
    this.orderService.getAll().subscribe(data=>{
      console.log(data)
    let dateOrder = data.filter((order:any)=>{
      return order.orderStatus == 1 && +(new Date(order.updateTime)) >= +(new Date(this.date.tungay)) && +(new Date(order.updateTime)) <= +(new Date(this.date.denngay))
    })
    dateOrder.map((order:any)=>{
      order.products.map((p:any)=>{
        this.thongke.push(p);
      })
    })
    console.log(this.thongke);
    for(let x=0; x<this.thongke.length; x++){
      for(let i= 0; i<this.thongke.length-1; i++) {
        for(let j=i+1; j<this.thongke.length; j++){
          if(this.thongke[i]?.id == this.thongke[j]?.id){
            this.thongke[i].count += this.thongke[j]?.count
            this.thongke.splice(j,1)
          }
        }
      }
    }
    this.tong = dateOrder.reduce((total:any, curr:any)=> total + curr.orderAmount,0);
    console.log(this.tong);
  })
  this.openModal()
  }
  openModal() {
    this.modalRef = this.modalService.show(this.deleteModal, {class: 'modal-lg'});
  }
  decline(): void {
    this.modalRef?.hide();
  }
  fileName= 'ExcelSheet.xlsx';
  exportexcel(){
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
