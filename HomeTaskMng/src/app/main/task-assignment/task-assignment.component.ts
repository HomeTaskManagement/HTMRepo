import { Component, OnInit } from '@angular/core';
import { AssignedTask } from '../model/assignedTask';
import { Child } from '../model/child';
import { ChildService } from '../services/child.service';
import { Task } from '../model/task';
import { TaskService } from '../services/task.service';
import { DbChild } from '../../../db/dbchild';
import * as moment from 'moment';

@Component({
  selector: 'task-assignment',
  templateUrl: './task-assignment.component.html',
  styleUrls: ['./task-assignment.component.css']
})

export class TaskAssignmentComponent implements OnInit {

  private child: Child;
  private task: Task;
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
    console.log(this.task, this.child, this.dueDate);
      
    let formatDate = moment(this.dueDate).format('L LT');
    let taskToAssign = new AssignedTask(this.task.name, this.child.name, formatDate, 0, false);
    this.taskService.assignTask(taskToAssign).then(() => {
      //Todo: popup message?
      console.log(taskToAssign);
    });
    
  }

}
