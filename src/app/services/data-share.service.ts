import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../model/product';
@Injectable({
  providedIn: 'root' // auto global
})
export class DataShareService {
    data:any;
    private dataSource = new BehaviorSubject<any>([]);  //BehaviorSubject lấy value cuối cùng của dòng chảy
    private createdPostSource = new BehaviorSubject<any>([]); //BehaviorSubject l
    private dataObject = new BehaviorSubject<any>({}); //BehaviorSubject l

    // Observable string streams
    dataSource$ = this.dataSource.asObservable(); //subscribe thì nhận đc data
    createdPostSource$ = this.createdPostSource.asObservable();
    dataObject$ = this.dataObject.asObservable();
    // Service message commands
    passData(data: any) {
     this.dataSource.next(data);// nhận được data và đẩy nó ra
    }
    passCreatedPostSource(data:any[]){
     this.createdPostSource.next(data);
    }
    passDataObject(data:{}){
      this.dataObject.next(data);
    }
}
