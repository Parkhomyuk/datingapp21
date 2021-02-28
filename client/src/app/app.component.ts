import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'da-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title;
  url: string="https://localhost:5001/api/users";
  constructor(private http: HttpClient, private authService: AuthService ){}

  ngOnInit(): void{
    this.setCurrentUser()
  }

  setCurrentUser(){
    const user= JSON.parse(localStorage.getItem('user'));
    this.authService.setCurrentUser(user);
  }

}
