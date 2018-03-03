import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LoggedinUser } from "../model/login";



@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
  

export class ContentComponent implements OnInit {

  private loggedinUsername : string;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }
}
