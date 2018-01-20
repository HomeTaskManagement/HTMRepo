import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { ChildService } from './main/services/child.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainModule
  ],
  providers: [ChildService],
  bootstrap: [AppComponent]
})
export class AppModule { }
