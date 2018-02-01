import { Component, OnInit } from '@angular/core';
import { AssignedTask } from '../model/assignedTask';
import { Child } from '../model/child';
import { ChildService } from '../services/child.service';
import { Task } from '../model/task';
import { TaskService } from '../services/task.service';
import { DbChild } from '../../../db/dbchild';

@Component({
  selector: 'task-assignment',
  templateUrl: './task-assignment.component.html',
  styleUrls: ['./task-assignment.component.css']
})

export class TaskAssignmentComponent implements OnInit {

  private childName: string;
  private taskName: string;
  private dueDate: Date;

  private children: Array<Object>;
  private tasks: Array<Object>;

  constructor(private childService: ChildService, private taskService: TaskService) { }

  ngOnInit() {
    this.initChildren();
    this.initTasks();
  }

  initChildren() {
    this.children = new Array<Object>();
    // let svcChildren: Child[];
    // svcChildren = this.childService.getChildren();

    // for (let child of svcChildren) {
    //   this.children.push({ 'label': child.name, 'value': child });
    // }
    this.childService.getChildren().subscribe(dbChild => {
      dbChild.forEach(child => {
        this.children.push({
          'label': child.name, 'value': new Child(
            child.name,
            child.age,
            child.availability)
        })
      });

    });
  }

  initTasks() {
    this.tasks = new Array<Object>();

    this.taskService.getAllTasks().subscribe(dbtasks => {
      dbtasks.forEach(task => {
        this.tasks.push({
          'label': task.name, 'value': new Task(
            task.name,
            task.description,
            task.duration,
            task.minAge,
            task.duration)
        });
      });
      console.log(this.tasks);
    });
  }

  assignTask() {
    //To-Do: change to id's and call to save service...
    let assignedTask: AssignedTask = new AssignedTask(this.taskName, this.childName, this.dueDate);
    console.log(this.childName, this.taskName, this.dueDate);
  }
}
