import { AfterViewInit, Component, TemplateRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../model/product';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy, AfterViewInit {
  public products: Product[] = [];
  public totalElements:number = 0;
  loading:boolean=false;
  modalRef?: BsModalRef;
  id = 0;
  @ViewChild('template') deleteModal:any;
  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,private modalService: BsModalService,protected alertService: AlertService) {}
  page: any;
  private querySub!: Subscription;
  ngOnInit(): void {
    this.querySub = this.activatedRoute.queryParams.subscribe(() => {
      this.update();
    });
  }

  update() {
    if (this.activatedRoute.snapshot.queryParamMap.get('page')) {
        const currentPage = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
        const size = Number(this.activatedRoute.snapshot.queryParamMap.get('size'));
        this.getProds(currentPage, size);
    } else {
        this.getProds();
    }
}

  getProds(page: number = 1, size: number = 3) {
    this.productService.getAllInPage(+page, +size).subscribe(page => {
            this.page = page;
        });
  }
  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
  counter(i = 1) {
    return new Array(i);
  }
  ngAfterViewInit() {
  }
  openModal(id:any) {
    this.id = id;
    this.modalRef = this.modalService.show(this.deleteModal, {class: 'modal-md'});
  }

  confirm(): void {
    this.productService.delete(this.id).subscribe(data => {
      console.log(data);
    },err=>console.log(err))
    this.modalRef?.hide();
    this.getProds();
    this.alertService.success('Xóa thành công!',this.options);
  }

  decline(): void {
    this.modalRef?.hide();
  }
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  onClick(){
    this.alertService.success('Xóa thành công!',this.options);
  }
}
