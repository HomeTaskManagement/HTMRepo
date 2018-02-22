import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TaskService } from '../services/task.service';
import { Task } from '../model/Task';
import { AssignedTask } from '../model/assignedTask';
import { Message } from 'primeng/api';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  private score: number;
  private dueDate: Date;
  private formatDueDate: string;

  private allAssignedTasks: AssignedTask[] = [];
  private tasksByDate: Array<Object>;
  private selectedTask: AssignedTask;
  private msgs: Message[] = [];

  newTaskAssignedSubscription: Subscription;

  constructor(private taskService: TaskService) {
    // listen to new task assignment added event
    this.newTaskAssignedSubscription = taskService.taskAssignmentAdded$.subscribe(
      assignedTask => {
        console.log('feedback get assignedTask from subject: ', assignedTask);
        this.initAllAssignedTasks();
      });
  }

  ngOnInit() {
    this.initAllAssignedTasks();
  }

  initAllAssignedTasks() {
    this.taskService.getAssignedTasks().subscribe(taskAssignment => {
      this.allAssignedTasks = taskAssignment;
    });
  }

  loadTasksByDate() {
    console.log("loadTasksByDate - selected date is:", this.dueDate);
    this.formatDueDate = moment(this.dueDate).format('L');
    //let filteredTasks = this.allAssignedTasks.filter(t => t.taskName === 'ww');

    this.tasksByDate = new Array<Object>();
    this.allAssignedTasks.forEach(task => {
      let fAssignedTasks = moment(task.date).format('L');
      if (fAssignedTasks === this.formatDueDate)
        this.tasksByDate.push({ 'label': task.taskName, 'value': task })
    });
  }

  sendFeedback() {
    console.log("sendFeedback- feedback has been sent with score: ", this.score);
    this.taskService.sendFeedback(this.selectedTask, this.score);
    this.msgs.push({ severity: 'success', summary: 'Feedback', detail: 'Thank you for you feedback' });
    this.clearFields();
  }

  clearFields() {
    this.dueDate = null;
    this.selectedTask = null;
    this.score = null;    
    setTimeout(() => this.msgs = [], environment.msgTimeout);    
  }
}
