export class Order {
  orderId: number;
  buyerEmail: string;
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
  orderAmount: string;
  orderStatus: string;
  createTime: string;
  updateTime: string;
  constructor(orderId: number, buyerEmail: string, buyerName: string, buyerPhone: string, buyerAddress: string, orderAmount: string, orderStatus: string, createTime: string, updateTime: string) {
    this.orderId = orderId;
    this.buyerEmail = buyerEmail;
    this.buyerName = buyerName;
    this.buyerPhone = buyerPhone;
    this.buyerAddress = buyerAddress;
    this.orderAmount = orderAmount;
    this.orderStatus = orderStatus;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }
}
