import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '@material/material.module';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FilterPipePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FilterPipePipe
  ]
})
export class SharedModule { }
