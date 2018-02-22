import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { environment } from '../../../environments/environment';

import { Task } from '../model/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  private name: string;
  private description: string;
  private duration: number;
  private minAge: number;
  private occurrence: number;
  private msgs: Message[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  addTask() {
    let task: Task = new Task(null, this.name, this.description, this.duration, this.minAge, this.occurrence);
    this.taskService.addNewTask(task).then(() => {
      console.log(`addTask ${task}`);
      this.msgs.push({ severity: 'success', summary: 'Success adding task', detail: `task: ${this.name} has been added` });
      this.clearFields();
    });
  }

  clearFields() {
    this.name = '';
    this.description = '';
    this.duration = null;
    this.minAge = null;
    this.occurrence = null;
    setTimeout(() => this.msgs = [], environment.msgTimeout);
  }

}
