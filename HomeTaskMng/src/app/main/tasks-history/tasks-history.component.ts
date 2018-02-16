import { Component, OnInit } from '@angular/core';
import { AssignedTask } from '../model/assignedTask';

import * as moment from 'moment';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'tasks-history',
  templateUrl: './tasks-history.component.html',
  styleUrls: ['./tasks-history.component.css']
})
export class TasksHistoryComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  assignedTasks = new Array<AssignedTask>();

  ngOnInit() {
    this.taskService.getAssignedTasks().subscribe(taskAssignment => {
      this.assignedTasks = taskAssignment;
    });
  }

}