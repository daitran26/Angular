import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  name = '';
  avatar = '';
  constructor(private tokenService: TokenService,private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
    }
  }
  logout(e:Event){
    e.preventDefault();
    this.tokenService.logout();
    this.router.navigate(['/']).then(()=>{window.location.reload()});
  }
}
