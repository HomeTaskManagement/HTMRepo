import { Component, OnInit } from '@angular/core';
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

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  addTask() {
    let task: Task = new Task(null, this.name, this.description, this.duration, this.minAge, this.occurrence);
    this.taskService.addNewTask(task).then(() => {
      console.log(task);
      //   this.taskService.getAllTasks().subscribe(tasks => {
      //     this.tasks = tasks;
      //   });
    });
  }
}
