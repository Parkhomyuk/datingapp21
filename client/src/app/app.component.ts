import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'da-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title;
  url: string="https://localhost:5001/api/users";
  constructor(private http: HttpClient){}

  ngOnInit(): void{
    this.http.get(this.url).subscribe(data=> this.title=data)
  }

}
