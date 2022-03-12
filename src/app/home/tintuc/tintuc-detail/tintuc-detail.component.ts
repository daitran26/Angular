import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TintucService } from 'src/app/services/tintuc.service';

@Component({
  selector: 'app-tintuc-detail',
  templateUrl: './tintuc-detail.component.html',
  styleUrls: ['./tintuc-detail.component.css']
})
export class TintucDetailComponent implements OnInit {
  tintuc:any;
  constructor(private activatedRoute: ActivatedRoute,private tintucService:TintucService) { }

  ngOnInit(): void {
    this.tintucService.getDetail(+this.activatedRoute.snapshot.url[1].path).subscribe(data=> {
      this.tintuc = data;
    })
  }

}
