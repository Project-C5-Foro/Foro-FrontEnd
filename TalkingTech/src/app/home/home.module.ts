import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    NgxSpinnerModule
  ]
})
export class HomeModule { }
