import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '@shared/shared.module';

import { MaterialModule } from '@material/material.module';

import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    MaterialModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
