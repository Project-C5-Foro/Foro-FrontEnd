import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/auth.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { LoginResponse } from './../../../models/register.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toShow: any;
  user: LoginResponse;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.toShow = params['toShow'];
      console.log(this.toShow);
    });
    let userData: any = sessionStorage.getItem('user');
    userData = JSON.parse(userData);
    if (userData){
      this.user = userData.user;
    }
  }
  clear(): void{
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigate(['/home']);
  }
}
