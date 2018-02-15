import { Component, OnInit } from '@angular/core';
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
  private loginUser: string = 'Noa' //todo: get from service;

  private dueDate: Date;
  private formatDueDate: string;
  private tomeByDateTasks: AssignedTask[] = [];
  
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAssignedTasks().subscribe(dbTaskAssignment => {
      this.allAssignedToMeTasks = dbTaskAssignment.filter(s => s.childName === this.loginUser);
    });
  }

  loadTasksByDateAndUser() {
    this.formatDueDate = moment(new Date(this.dueDate)).format('L');
    this.allAssignedToMeTasks.forEach(task => {
      let currTaskDate = task.date.slice(0,10);
      if (currTaskDate === this.formatDueDate){
        this.tomeByDateTasks.push(task);        
      }
    });
    console.log('tomeByDateTasks', this.tomeByDateTasks);
    
  }

}
