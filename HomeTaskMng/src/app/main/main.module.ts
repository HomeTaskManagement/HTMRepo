import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChildComponent } from './child/child.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ChildComponent, TaskComponent],
  exports:[ChildComponent]
})
export class MainModule { }
