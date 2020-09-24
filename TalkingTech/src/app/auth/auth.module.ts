import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { MaterialModule } from '@material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SweetAlert2Module
  ],
})
export class AuthModule { }
