import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TintucService } from 'src/app/services/tintuc.service';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent implements OnInit {
  page:any;
  constructor(private tintucService: TintucService, private activatedRoute:ActivatedRoute,private router:Router) { }

  querySub!: Subscription;
  ngOnInit(): void {
    this.querySub = this.activatedRoute.queryParams.subscribe(() => {
      this.update();
    });
  }
  ngOnDestroy(){
    this.querySub.unsubscribe();
  }
  update(){
    if(this.activatedRoute.snapshot.queryParamMap.get('page')){
      const page = Number(this.activatedRoute.snapshot.queryParamMap.get('page'));
      const size = Number(this.activatedRoute.snapshot.queryParamMap.get('size'));
      this.tintucService.getPage(page, size).subscribe(data=>{
        this.page = data;
      });
    }
    else{
      this.tintucService.getPage(1, 4).subscribe(data=>{
        this.page = data;
      });
    }
  }
  counter(i = 1) {
    return new Array(i);
  }
  delete(id:number){
    let c = confirm("Bạn có muốn xóa tin này không ?");
        if (c) {
            this.tintucService.delete(id).subscribe(response => {
                if (response != null) {
                    console.log("Delete suceessfully")
                }
            },err => console.log(err))
            this.router.navigate(['/main/tintuc'])
        }
  }
}
