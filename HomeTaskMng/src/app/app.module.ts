import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { ChildService } from './main/services/child.service';
import { TaskService } from './main/services/task.service';
import { LoginComponent } from './main/login/login.component';
import { ContentComponent } from './main/content/content.component';
import { AppRoutingModule } from './app-routing/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    AppRoutingModule

  ],
  providers: [ChildService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
