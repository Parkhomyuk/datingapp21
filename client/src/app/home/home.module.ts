import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ButtonModule} from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [HomeComponent, RegisterComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
