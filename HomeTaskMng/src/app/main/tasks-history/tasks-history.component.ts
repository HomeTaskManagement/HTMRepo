import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AssignedTask } from '../model/assignedTask';

import * as moment from 'moment';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'tasks-history',
  templateUrl: './tasks-history.component.html',
  styleUrls: ['./tasks-history.component.css']
})
export class TasksHistoryComponent implements OnInit {

  newTaskAssignedSubscription: Subscription;
  newFeedbakSubscription: Subscription;

  constructor(private taskService: TaskService) {
    // listen to new task assignment added event
    this.newTaskAssignedSubscription = taskService.taskAssignmentAdded$.subscribe(
      assignedTask => {
        console.log('assignedTask from subject: ', assignedTask);
        this.assignedTasks.push(assignedTask);
      });

    // listen to new feedback added event
    this.newFeedbakSubscription = taskService.feedbackAdded$.subscribe(
      assignedTask => {
        console.log('feedback from subject: ', assignedTask);
        this.getAssignedTasks();                   
      });
  }

  assignedTasks = new Array<AssignedTask>();

  ngOnInit() {
    this.getAssignedTasks();
  }

  getAssignedTasks() {
    this.taskService.getAssignedTasks().subscribe(taskAssignment => {
      this.assignedTasks = taskAssignment;
    });
  }
}