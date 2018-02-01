import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';


import { ChildComponent } from './child/child.component';
import { TaskComponent } from './task/task.component';
import { TaskAssignmentComponent } from './task-assignment/task-assignment.component';
import { AccordionPanelComponent } from './accordion-panel/accordion-panel.component';
import { ContentComponent } from './content/content.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    DropdownModule,
    CalendarModule,
    RatingModule,
    ButtonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [ChildComponent, TaskComponent, TaskAssignmentComponent, AccordionPanelComponent, ContentComponent, FeedbackComponent],
  exports: [AccordionPanelComponent, ContentComponent, ChildComponent, TaskComponent, TaskAssignmentComponent, FeedbackComponent]
})
export class MainModule { }
