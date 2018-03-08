import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Router } from "@angular/router";
import { LoginComponent } from '../main/login/login.component';
import { ContentComponent } from "../main/content/content.component";

const routes : Route[] = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'login/content', component: ContentComponent }
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
