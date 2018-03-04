import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MenuItem } from 'primeng/api';
import * as moment from 'moment';
import { Message } from 'primeng/api';

import { environment } from '../../../environments/environment';
import { AssignedTask } from '../model/assignedTask';
import { TaskService } from '../services/task.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'tasks-history',
  templateUrl: './tasks-history.component.html',
  styleUrls: ['./tasks-history.component.css']
})
export class TasksHistoryComponent implements OnInit {

  newTaskAssignedSubscription: Subscription;
  newFeedbakSubscription: Subscription;
  newTaskReportedSubscription: Subscription;

  cols: any[];
  items: MenuItem[];

  private selectedTask: AssignedTask;
  private assignedTasks = new Array<AssignedTask>();
  private msgs: Message[] = [];
  private isAdmin: boolean;

  constructor(private taskService: TaskService, private loginService: LoginService) {
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

    // listen to new feedback added event
    this.newTaskReportedSubscription = taskService.taskReported$.subscribe(
      assignedTask => {
        console.log('report from subject: ', assignedTask);
        this.getAssignedTasks();
      });

  }

  ngOnInit() {
    this.isAdmin = (this.loginService.currUser.username === 'admin');

    this.cols = [
      { field: 'taskName', header: 'Task' },
      { field: 'childName', header: 'Child' },
      { field: 'date', header: 'Date' },
      { field: 'feedback', header: 'Feedback' },
      { field: 'done', header: 'Done' }
    ];

    this.getAssignedTasks();

    this.items = [
      { label: 'Delete', disabled: !this.isAdmin, icon: 'fa-close', command: (event) => this.delete(this.selectedTask) }
    ];
  }

  getAssignedTasks() {
    this.taskService.getAssignedTasks().subscribe(taskAssignment => {
      this.assignedTasks = taskAssignment;
    });
  }

  delete(selectedAssignedTask) {
    this.taskService.deleteAssignedTask(selectedAssignedTask);
    this.showDelMsg(selectedAssignedTask);
    let index = -1;
    for (let i = 0; i < this.assignedTasks.length; i++) {
      if (this.assignedTasks[i].id == selectedAssignedTask.id) {
        index = i;
        break;
      }
    }
    this.assignedTasks.splice(index, 1);
  }

  showDelMsg(selectedAssignedTask) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success delete assignment', detail: `The task ${selectedAssignedTask.taskName} is not assigned to ${selectedAssignedTask.childName} anymore.` });
  }
}