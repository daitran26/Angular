import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderStatus } from 'src/app/model/OrderStatus';
import { User } from 'src/app/model/user';
import { OrderService } from 'src/app/services/order.service';
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TabStopPosition, TabStopType, TextRun, BorderStyle, Table, TableCell , TableRow, WidthType} from "docx";
import { saveAs } from "file-saver";
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
  let size = 9;
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
  let c = confirm("Bạn có muốn hủy đơn hàng này không ?");
        if (c) {
  this.orderService.cancel(order.id).subscribe(res => {
      if (res) {
          order.orderStatus = res.orderStatus;
      }
  });}
}

finish(order: any) {
  let c = confirm("Xác nhận đơn hàng này?");
        if (c) {
  this.orderService.finish(order.id).subscribe(res => {
      if (res) {
          order.orderStatus = res.orderStatus;
      }
  })}
}
counter(i = 1) {
  return new Array(i);
}

// hoa done in order
public create(): Document {
  const document = new Document({
    sections: [{
      children: [
        new Paragraph({
          text: "CỬA HÀNG ĐIỆN THOẠI MdShop",
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Địa chỉ: 127 Phố Vọng, Hai Bà Trưng, Hà Nội",
              italics: true
            }),
            new TextRun({
              text: "Điện thoại : (04) 6674 2332 -- Email : mdsupport@gmail.com",
              break: 1,
            })
          ]
        }),
        new Paragraph({
          text: "HÓA ĐƠN BÁN HÀNG",
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          alignment: AlignmentType.LEFT,
          children: [
            new TextRun({
              text: `Tên khách hàng : ${this.orderDetail.buyerName}`,
              bold: true
            }),
            new TextRun({
              text: `Địa chỉ : ${this.orderDetail.buyerAddress}`,
              bold: true,
              break: 1,
            }),
            new TextRun({
              text: `Số điện thoại : ${this.orderDetail.buyerPhone}`,
              bold: true,
              break: 1,
            }),
            new TextRun({
              text: `Ngày in : ${(new Date()).getDate()}/${(new Date()).getMonth()+1}/${(new Date()).getFullYear()}`,
              bold: true,
              break: 1,
            })
          ]
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows:[
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({children:[new TextRun({text:'STT',bold:true})]})]
                }),
                new TableCell({
                  children: [new Paragraph({children:[new TextRun({text:'Tên sản phẩm',bold:true})]})]
                }),
                new TableCell({
                  children: [new Paragraph({children:[new TextRun({text:'Đơn giá',bold:true})]})]
                }),
                new TableCell({
                  children: [new Paragraph({children:[new TextRun({text:'Số lượng',bold:true})]})]
                }),
                new TableCell({
                  children: [new Paragraph({children:[new TextRun({text:'Thành tiền',bold:true})]})]
                }),
              ]
            }),
            ...this.createAchivementsList(this.orderDetail?.products),
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: `Tổng tiền : ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(this.orderDetail.orderAmount)}`,
              italics: true,
              bold: true
            }),
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: `Xin chân thành cảm ơn. Hẹn gặp lại quý khách!`,
              italics: true,
              bold: true
            }),
          ]
        }),
      ]
    }]
  });
return document;
}
public createAchivementsList(achivements: any[]): TableRow[] {
  return achivements.map(
    (achievement,index) =>
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({ text: `${index+1}`})
          ]
        }),
        new TableCell({
          children: [
            new Paragraph({ text: `${achievement.name}`})
          ]
        }),
        new TableCell({
          children: [
            new Paragraph({ text: `${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(achievement.price)}`})
          ]
        }),
        new TableCell({
          children: [
            new Paragraph({ text: `${achievement.count}`})
          ]
        }),
        new TableCell({
          children: [
            new Paragraph({ text: `${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(achievement.price *achievement.count)}`})
          ]
        }),
      ]
      })
  );
}
download(){
  let doc = this.create();
  Packer.toBlob(doc).then(blob => {
    console.log(blob);
    saveAs(blob, "example.docx");
  });
}
orderDetail:any = []
print(id:any){
  console.log(id)
  this.orderService.show(Number(id)).subscribe(data=>{
    this.orderDetail = data;
    console.log(data);
    let doc = this.create();
    Packer.toBlob(doc).then(blob => {
    console.log(blob);
    saveAs(blob, "example.docx");
  });
  })
}
}
