import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Router } from "@angular/router";
import { LoginComponent } from '../main/login/login.component';
import { ContentComponent } from "../main/content/content.component";

const routes : Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'logout/:login', component: LoginComponent },
  { path: 'content', component: ContentComponent },
  { path: 'login/:content', component: LoginComponent }
]

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
],
exports: [
    RouterModule
]
})
export class AppRoutingModule { }
