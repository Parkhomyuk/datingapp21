import { Component, OnInit, Output, EventEmitter , OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MustMatch } from 'src/app/home/components/register/_helper/must-match.validator';
import {AuthService} from 'src/app/services/auth.service';
import {Subscription} from 'rxjs';

import {UserRequestInterfase} from 'src/app/_models/interfaces/userRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  subscription: Subscription;
  @Output('cancel') cancelRegister = new EventEmitter();
  constructor(private fb: FormBuilder, private authSevice: AuthService) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm= this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required ]]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }
    )
  }
  registerUser(){
    console.log('register form', this.registerForm.value);
    const user: UserRequestInterfase={userName: this.registerForm.value.username, password: this.registerForm.value.password};
    console.log('user rom register', user)
    this.subscription= this.authSevice.registerUser(user).subscribe(response=>{
        // this.authSevice.setCurrentUser(response);
        console.log('response', response)
        this.createRegisterForm();
        this.cancelRegister.emit(false)
    },error=>{
      console.log('Error register', error)
    })

  }
  cancel(){
    this.createRegisterForm();
    this.cancelRegister.emit(false);
  }

  private validationAreEqual(fieldControl: FormControl){
      return fieldControl.value === this.registerForm.get('password').value ? null : {NotEqual: true}
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }
}
