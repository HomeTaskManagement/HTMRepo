import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Task } from '../model/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'alltasks',
  templateUrl: './alltasks.component.html',
  styleUrls: ['./alltasks.component.css']
})


export class AlltasksComponent implements OnInit {

  cols: any[];
  tasks = new Array<Task>();

  private displayDialog: boolean;
  private task: Task;
  private selectedTask: Task;

  newTasksubscription: Subscription;

  constructor(private taskService: TaskService) {
    // listen to new task added event
    this.newTasksubscription = taskService.taskAdded$.subscribe(
      task => {
        console.log('child from subject: ', task);
        this.tasks.push(task);
      });
  }

  ngOnInit() {
    this.cols = [      
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'duration', header: 'Duration' },
      { field: 'minAge', header: 'MinAge' },
      { field: 'occurrence', header: 'Occurrence' }
    ];

    this.getTasks();
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onRowSelect(event) {
    this.task = this.cloneTask(event.data);
    this.displayDialog = true;
  }

  cloneTask(c: Task): Task {
    let tmpTask = {};
    for (let prop in c) {
      tmpTask[prop] = c[prop];
    }
    return tmpTask as Task;
  }

  save() {
    console.log(`child to change: ${this.task}`);
    this.taskService.updateTaskDetails(this.task);

     this.updateTasksByChanges();
     this.task = null;
     this.displayDialog = false;
  }

  updateTasksByChanges(){
    let index = -1;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == this.task.id) {
        index = i;
        break;
      }
    }    
    this.tasks[index].description = this.task.description;
    this.tasks[index].duration = this.task.duration;
    this.tasks[index].minAge = this.task.minAge;
    this.tasks[index].occurrence = this.task.occurrence
  }

}
