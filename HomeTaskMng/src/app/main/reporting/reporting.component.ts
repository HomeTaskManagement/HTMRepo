import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TaskService } from '../services/task.service';
import { AssignedTask } from '../model/assignedTask';
import * as moment from 'moment';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  private allAssignedToMeTasks: AssignedTask[] = [];

  private dueDate: Date;
  private formatDueDate: string;
  private tomeByDateTasks: AssignedTask[] = [];
  private loggedinUsername: string;

  newTaskAssignedSubscription: Subscription;

  constructor(private taskService: TaskService, private loginService: LoginService) {
    // listen to new task assignment added event
    this.newTaskAssignedSubscription = taskService.taskAssignmentAdded$.subscribe(
      assignedTask => {
        console.log('reporting get assignedTask from subject: ', assignedTask);
        this.initAllAssignedToMeTasks();
      });
  }

  ngOnInit() {
    this.initAllAssignedToMeTasks();
    this.loggedinUsername = this.loginService.currUser.username;
  }

  initAllAssignedToMeTasks() {
    this.taskService.getAssignedTasks().subscribe(taskAssignment => {
      this.allAssignedToMeTasks = taskAssignment;
      if (this.loggedinUsername && this.loginService.currUser.username !== 'admin') {
        this.allAssignedToMeTasks = taskAssignment.filter(s => s.childName === this.loggedinUsername);
      }
    });
  }

  loadTasksByDateAndUser() {
    this.tomeByDateTasks = [];
    this.formatDueDate = moment(new Date(this.dueDate)).format('L');
    this.allAssignedToMeTasks.forEach(task => {
      let currTaskDate = task.date.slice(0, 10);
      if (currTaskDate === this.formatDueDate) {
        this.tomeByDateTasks.push(task);
      }
    });
    console.log('tomeByDateTasks', this.tomeByDateTasks);
  }

  saveTasksStates() {
    this.allAssignedToMeTasks.forEach(task => {
      console.log(task);
      this.taskService.report(task);
    });
  }

}
