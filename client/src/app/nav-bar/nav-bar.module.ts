import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { MegaMenuModule } from 'primeng/megamenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    MegaMenuModule,
    MenuModule,
  ],
  exports:[NavBarComponent]
})
export class NavBarModule { }
