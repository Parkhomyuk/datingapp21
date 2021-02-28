import { Component, OnInit,  OnChanges, SimpleChanges, AfterContentChecked, OnDestroy } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MenuItem} from 'primeng/api';
import {  MessageService, PrimeNGConfig} from 'primeng/api';
import {MegaMenuItem} from 'primeng/api';
import {UserRequestInterfase} from 'src/app/_models/interfaces/userRequest.interface';
import {UserResponseInterface} from 'src/app/_models/interfaces/userResponse.interface';
import {AuthService} from 'src/app/services/auth.service';

import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy ,  AfterContentChecked  {
  items: MenuItem[];
  itemsUser:  MenuItem[];
  loginForm: FormGroup;
  loginSuccess: boolean=false;
  currentUser: any;
  subscription: Subscription;
  constructor(private fb: FormBuilder, public authService: AuthService,) { }

 
  ngOnInit(): void {
    this.loginFormCreation();  
    
    this.subscription= this.authService.getUsers().subscribe(response=> {
        console.log('users response', response)}
        );
     
     this.getCurrentUser();   

       
  }
  
  getCurrentUser(){
     
      this.authService.currentUser$.subscribe(user=>{
          console.log('getUser', user);
          this.loginSuccess=!!user;
          console.log('getUser2', this.loginSuccess);
          if(this.loginSuccess){
            this.createMenuItems();
            this.createUserMenuItems();
            this.currentUser=user;
            console.log('currentUser$',this.currentUser)
          }
      }, error=>{
          console.log('Error', error)
      })
  }
   
  ngAfterContentChecked() {
   
     
  }

  loginUser(){
    this.authService.login(this.loginForm.value).subscribe(response=> {
         
        console.log('response from http', response)
        this.loginSuccess=true;
        this.loginForm=null;
        this.createMenuItems();
        this.createUserMenuItems();
    }, (error)=>{
        console.log('nu error', error)
    }
    )  
    console.log("user", this.loginForm.value)
}
  

  loginFormCreation(){
      this.loginForm = this.fb.group({
          userName: [''],
          password: ['']
      })
  }

  logout(){
     this.loginSuccess=false;
     this.items=[]
     this.loginFormCreation();
     console.log('logout');
     this.authService.logout();
  }
  createUserMenuItems(){
    this.itemsUser = [{
        label: 'My area',
        items: [{
            label: 'Edit profile',
            icon: 'pi pi-refresh',
            command: () => {
               
            }
        },
        {
            label:'Logout',
            icon:'pi pi-fw pi-power-off',
            command: (event) => {
                //event.originalEvent: Browser event
                //event.item: menuitem metadata
                console.log('event', event)
                this.logout()
            }
            //routerLink:"/demo"
        }
        ]} 
         
    ];
    }
    
  createMenuItems(){
    if(this.loginSuccess===true){
        this.items = [
            {
                label:'Matches',
                icon:'pi pi-fw pi-file',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-plus',
                        items:[
                        {
                            label:'Bookmark',
                            icon:'pi pi-fw pi-bookmark'
                        },
                        {
                            label:'Video',
                            icon:'pi pi-fw pi-video'
                        },
      
                        ]
                    },
                    {
                        label:'Delete',
                        icon:'pi pi-fw pi-trash'
                    },
                    {
                        separator:true
                    },
                    {
                        label:'Export',
                        icon:'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label:'Lists',
                icon:'pi pi-fw pi-pencil',
                items:[
                    {
                        label:'Left',
                        icon:'pi pi-fw pi-align-left'
                    },
                    {
                        label:'Right',
                        icon:'pi pi-fw pi-align-right'
                    },
                    {
                        label:'Center',
                        icon:'pi pi-fw pi-align-center'
                    },
                    {
                        label:'Justify',
                        icon:'pi pi-fw pi-align-justify'
                    },
      
                ]
            },
            {
                label:'Messages',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'New',
                        icon:'pi pi-fw pi-user-plus',
      
                    },
                    {
                        label:'Delete',
                        icon:'pi pi-fw pi-user-minus',
      
                    },
                    {
                        label:'Search',
                        icon:'pi pi-fw pi-users',
                        items:[
                        {
                            label:'Filter',
                            icon:'pi pi-fw pi-filter',
                            items:[
                                {
                                    label:'Print',
                                    icon:'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon:'pi pi-fw pi-bars',
                            label:'List'
                        }
                        ]
                    }
                ]
            },
             
            
        ];
    }  
    
  }
  ngOnDestroy(): void{
      this.subscription.unsubscribe()
  }

}
