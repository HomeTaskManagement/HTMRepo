import { Component, OnInit } from '@angular/core';
import { Child } from '../model/child';
import { ChildService } from '../services/child.service';
import { Message } from 'primeng/api';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  private name: string;
  private age: number;
  private availability: number;
  private msgs: Message[] = [];

  constructor(private childService: ChildService) { }

  ngOnInit() {
  }

  addChild() {
    let child: Child = new Child(null, this.name, this.age, this.availability);
    this.childService.addNewChild(child).then(() => {
      console.log('new child added:', child);
      this.msgs.push({ severity: 'success', summary: 'Success adding child', detail: `child: ${this.name} has been added` });
      this.clearFields();
    });
  }

  clearFields() {
    this.name ='';
    this.age = null;
    this.availability = null;
    setTimeout(() => this.msgs = [], environment.msgTimeout);
  }
}
