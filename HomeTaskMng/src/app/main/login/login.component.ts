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

  private childExists: boolean;
  private worngParameters: boolean;
  private currentUser: LoggedinUser = new LoggedinUser();
  private userName: string;
  private userPass: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }
  Login() {
    this.childExists = false;

    this.currentUser.password = this.userPass;
    this.currentUser.username = this.userName;

    if (this.userPass === "123456" && this.userName === 'admin') {
      this.childExists = true;
      this.router.navigate(['content']);   
      this.loginService.currUser = this.currentUser;
    }

    else if (this.userPass === "1234") {
      this.loginService.checkChildExists(this.currentUser).then(result => {
        if (result) {
          this.childExists = true;
          this.router.navigate(['content']);
          this.loginService.currUser = this.currentUser;
        }
        else {
          this.childExists = false;
        }
      });
    }
    else {
      this.worngParameters = false;
    }

  }

}

