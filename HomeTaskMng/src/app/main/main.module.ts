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
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { DialogModule } from 'primeng/dialog';
import { GrowlModule } from 'primeng/growl';

import { ChildComponent } from './child/child.component';
import { TaskComponent } from './task/task.component';
import { TaskAssignmentComponent } from './task-assignment/task-assignment.component';
import { AccordionPanelComponent } from './accordion-panel/accordion-panel.component';
import { ContentComponent } from './content/content.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HttpClientModule } from '@angular/common/http';
import { TasksHistoryComponent } from './tasks-history/tasks-history.component';
import { ReportingComponent } from './reporting/reporting.component';
import { SettingsComponent } from './settings/settings.component';
import { AlltasksComponent } from './alltasks/alltasks.component';
import { AllchildsComponent } from './allchilds/allchilds.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    DropdownModule,
    CalendarModule,
    RatingModule,
    ButtonModule,
    TableModule,
    InputSwitchModule,
    ContextMenuModule,
    TriStateCheckboxModule,
    DialogModule,
    GrowlModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [ChildComponent, TaskComponent, TaskAssignmentComponent, AccordionPanelComponent, ContentComponent, FeedbackComponent, TasksHistoryComponent, ReportingComponent, SettingsComponent, AlltasksComponent, AllchildsComponent, LoginComponent],
  exports: [AccordionPanelComponent, ContentComponent, ChildComponent, TaskComponent, TaskAssignmentComponent, FeedbackComponent, TasksHistoryComponent, ReportingComponent, SettingsComponent, LoginComponent]
})
export class MainModule { }