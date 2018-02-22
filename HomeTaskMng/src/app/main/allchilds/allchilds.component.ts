import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Child } from '../model/child';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'allchilds',
  templateUrl: './allchilds.component.html',
  styleUrls: ['./allchilds.component.css']
})
export class AllchildsComponent implements OnInit {

  cols: any[];
  childs = new Array<Child>();

  private displayDialog: boolean;
  private child: Child;
  private selectedChild: Child;
  newChildsubscription: Subscription;

  constructor(private childService: ChildService) {
    // listen to new child added event
    this.newChildsubscription = childService.childAdded$.subscribe(
      child => {
        console.log('child from subject: ', child);
        this.childs.push(child);
      });
  }

  ngOnInit() {
    this.cols = [      
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
      { field: 'availability', header: 'Availability' }
    ];

    this.getChilds();
  }

  getChilds() {
    this.childService.getChildren().subscribe(childs => {
      this.childs = childs;
    });
  }

  onRowSelect(event) {
    this.child = this.cloneChild(event.data);
    this.displayDialog = true;
  }

  cloneChild(c: Child): Child {
    let tmpChild = {};
    for (let prop in c) {
      tmpChild[prop] = c[prop];
    }
    return tmpChild as Child;
  }

  save() {
    console.log(`child to change: ${this.child}`);
    this.childService.updateChildDetails(this.child);

    this.updateChildsByChanges();
    this.child = null;
    this.displayDialog = false;
  }

  updateChildsByChanges() {
    let index = -1;
    for (let i = 0; i < this.childs.length; i++) {
      if (this.childs[i].id == this.child.id) {
        index = i;
        break;
      }
    }    
    this.childs[index].age = this.child.age;
    this.childs[index].availability = this.child.availability;
  }
}
