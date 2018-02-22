import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TaskService } from '../services/task.service';
import { AssignedTask } from '../model/assignedTask';
import * as moment from 'moment';

@Component({
  selector: 'reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  private allAssignedToMeTasks: AssignedTask[] = [];
  //private loginUser: string = 'Noa' //todo: get from service;
  private loginUser: string;

  private dueDate: Date;
  private formatDueDate: string;
  private tomeByDateTasks: AssignedTask[] = [];

  newTaskAssignedSubscription: Subscription;

  constructor(private taskService: TaskService) {
    // listen to new task assignment added event
    this.newTaskAssignedSubscription = taskService.taskAssignmentAdded$.subscribe(
      assignedTask => {
        console.log('reporting get assignedTask from subject: ', assignedTask);
        this.initAllAssignedToMeTasks();
      });
  }

  ngOnInit() {
    this.initAllAssignedToMeTasks();
  }

  initAllAssignedToMeTasks() {
    this.taskService.getAssignedTasks().subscribe(taskAssignment => {
      this.allAssignedToMeTasks = taskAssignment;
      if (this.loginUser) {
        this.allAssignedToMeTasks = taskAssignment.filter(s => s.childName === this.loginUser);
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
