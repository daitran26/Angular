import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  page: any;
  private querySub!: Subscription;
  constructor(private authService: AuthService,private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.querySub = this.activatedRoute.queryParams.subscribe(() => {
      this.update();
      console.log(this.page)
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

  getProds(page: number = 1, size: number = 4) {
    this.authService.pageUser(+page, +size)
        .subscribe(page => {
            this.page = page;
        });

}
  counter(i = 1) {
    return new Array(i);
  }
  delete(id:any){
    let c = confirm("Bạn có muốn xóa tài khoản này không ?");
        if (c) {
            this.authService.deleteUser(id).subscribe(response => {
                if (response != null) {
                    console.log("Delete suceessfully")
                }
            },err => console.log(err))
            this.router.navigate(['/main/user'])
        }
  }

}
