import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { ChildService } from './main/services/child.service';
import { TaskService } from './main/services/task.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginService } from './main/services/login.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    AppRoutingModule

  ],
  providers: [ChildService, TaskService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
