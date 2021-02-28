import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode: boolean=false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log('currentuser', this.authService.currentUser$)
  }

  goToRegister(){
    this.registerMode=true;
  }

  cancelRegisterMode(event){
    this.registerMode=event;
  }

}
