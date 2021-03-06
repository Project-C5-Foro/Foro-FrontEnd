import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LoginResponse } from '@models/register.model';

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
  ) { }

  ngOnInit(): void {
    let userData: any = sessionStorage.getItem('user');
    userData = JSON.parse(userData);
    if (userData){
      this.user = userData.user;
    }
  }
  clear(): void{
    sessionStorage.clear();
    localStorage.clear();
    this.user = null;
    this.route.navigate(['/home']);
  }
}
