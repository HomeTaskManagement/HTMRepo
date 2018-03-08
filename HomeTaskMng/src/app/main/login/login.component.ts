import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Child } from '../model/child';
import { ChildService } from '../services/child.service';
import { LoginService } from '../services/login.service';
import { forEach } from '@angular/router/src/utils/collection';
import { LoggedinUser } from "../model/login";
import { AppComponent } from '../../app.component';
import { ContentComponent } from '../content/content.component';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginService: any;

  private userExists: boolean;
  private worngPassword: boolean;
  private emptyFields: boolean;
  private currentUser: LoggedinUser = new LoggedinUser();
  private userName: string;
  private userPass: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  Login() {
    this.userExists = false;

    this.currentUser.password = this.userPass;
    this.currentUser.username = this.userName;

    if (this.userPass.length == 0 || this.userName.length ==0){
      this.emptyFields = true;
      this.userExists = true;
      this.worngPassword = false;
      }

     else{ 

   if ( this.userName === 'admin'){
        if (this.userPass === "123456"){
          this.emptyFields = false;
          this.worngPassword = false;
          this.userExists = true;
          this.router.navigate(['login/content']);   
          this.loginService.currUser = this.currentUser;
         }
        else{
         this.emptyFields = false;
         this.worngPassword =true;
         this.userExists=true;
       }
    }

    else if (this.userPass === "1234") {
      this.loginService.checkChildExists(this.currentUser).then(result => {
        if (result) {
          this.emptyFields = false;
          this.worngPassword = false;
          this.userExists = true;
          this.router.navigate(['login/content']);
          this.loginService.currUser = this.currentUser;
        }
        else {
          this.emptyFields = false;
          this.worngPassword = false;
          this.userExists = false;
        }
      });
    }
    else {
      this.emptyFields = false;
      this.worngPassword =true;
      this.userExists = true;
    }

  }

}
}


