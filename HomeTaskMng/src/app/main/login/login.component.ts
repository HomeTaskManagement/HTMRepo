import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Child } from '../model/child';
import { ChildService } from '../services/child.service';
import { LoginService } from '../services/login.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Login } from "../model/login";
import { AppComponent } from '../../app.component';
import { ContentComponent } from '../content/content.component';



@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginService: any;

  private childExists: boolean;
  private worngParameters: boolean;
  private edited: boolean;
  private currentUser: Login = new Login();
  private userName: string;
  private userPass: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }
  Login() {
    this.childExists = false;

    if (this.userPass === "123456" && this.userName === 'admin') {
      this.childExists = true;
      this.router.navigate(['content']);    
    }

    else if (this.userPass === "1234") {
      this.currentUser.password = this.userPass;
      this.currentUser.username = this.userName;

      this.loginService.checkChildExists(this.currentUser).then(result => {
        if (result) {
          this.childExists = true;
          this.router.navigate(['content']);
        }
        else {
          this.childExists = result;
        }
      });
    }
    else {
      this.worngParameters = false;
    }

  }

}

