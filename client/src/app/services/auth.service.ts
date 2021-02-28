import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserRequestInterfase} from 'src/app/_models/interfaces/userRequest.interface';
import {UserResponseInterface} from 'src/app/_models/interfaces/userResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url="https://localhost:5001/api"
  currentUserResource = new ReplaySubject(1);
  currentUser$= this.currentUserResource.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(){
    const usersUrl=this.url+'/users';
    return this.http.get(usersUrl)
  }
  login(user: UserRequestInterfase){
    const currentUser=this.url+'/account/login'
    return this.http.post(currentUser, user).pipe(map((response: UserResponseInterface)=>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
        return user;
    }))
  }
  registerUser(user: UserRequestInterfase){
    const registerUser= this.url+'/account/register';
    return this.http.post(registerUser,user).pipe(map((response: UserResponseInterface)=>{
      const user = response;
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        this.setCurrentUser(user);

      }
    }, (error)=>{console.log('Error register', error)}))
  }
  logout(){
    localStorage.removeItem('user');
    this.setCurrentUser(null)
  }

  setCurrentUser(user: UserResponseInterface){
    this.currentUserResource.next(user);
  }
  getCurrentUser(){
    return this.currentUser$;
  }
}
