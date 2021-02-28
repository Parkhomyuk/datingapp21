import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

 

import { AppComponent } from './app.component';

import {NavBarModule} from 'src/app/nav-bar/nav-bar.module';
import {HomeModule} from 'src/app/home/home.module';
 

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,
    NavBarModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
