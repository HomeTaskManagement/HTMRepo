import { Component, OnInit } from '@angular/core';
import { Child } from '../model/child';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  private name: string;
  private age: number;
  private availability: number;

  constructor(private childService: ChildService) { }

  ngOnInit() {
  }

  addChild() {
    let child: Child = new Child(this.name, this.age, this.availability);
    this.childService.addNewChild(child).then(() => {
      console.log(child);
      //   this.taskService.getAllTasks().subscribe(tasks => {
      //     this.tasks = tasks;
      // });
    });
  }
}
