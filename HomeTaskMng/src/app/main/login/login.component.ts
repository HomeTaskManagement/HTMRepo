import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Child } from '../model/child';
import { ChildService } from '../services/child.service';
import { LoginService } from '../services/login.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Login } from "../model/login";


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
  private userName : string;
  private userPass : string;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  Login() {
    if (this.userPass === "1234") {
      if (this.userName === 'admin') {
        this.edited = true;
        this.router.navigate(['content']);
      }
      else {
        this.childExists = false;
        this.LoginService.checkChildExists(this.userName).then(result => {
          if (result) {
            this.router.navigate(['content']);
          }
          else {
            this.childExists = result;
          }
        });
      }
    }
    else {
      this.worngParameters = false;
    }

  }

}

