import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/auth.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toShow: any;

  constructor(
    private route: ActivatedRoute,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.toShow = params['toShow'];
      console.log(this.toShow);
    });
  }
}
