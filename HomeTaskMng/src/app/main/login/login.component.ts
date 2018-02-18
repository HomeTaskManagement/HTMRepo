import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
//   Login(username, password){
//     if (username.forEach(child => {
//       let childname = child.childName;
//       if (childname === username && password=='1223') {
//         this.router.navigate(['userlogin']);
//     }
//    else
//    {
//       alert ('One or more parameters are wrong');
//     }
// });
Login(){
  this.router.navigate(['useeLogin',666]);
}
}

