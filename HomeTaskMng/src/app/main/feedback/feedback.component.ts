import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { DbTask } from '../../../db/dbTask';
import { AssignedTask } from '../model/assignedTask';
import * as moment from 'moment';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  private score: number;
  private dueDate: Date;
  private formatDueDate: string;

  private allAssignedTasks: AssignedTask[] = [];
  private tasksByDate: Array<Object>;
  private selectedTask: AssignedTask;

  constructor(private taskService: TaskService) { }

  ngOnInit() {

    this.taskService.getAssignedTasks().subscribe(dbTaskAssignment => {
      this.allAssignedTasks = dbTaskAssignment;
    });
  }

  loadTasksByDate() {
    console.log("loadTasksByDate - selected date is:", this.dueDate);
    this.formatDueDate = moment(this.dueDate).format('L');
    //let filteredTasks = this.allAssignedTasks.filter(t => t.taskName === 'ww');

    this.tasksByDate = new Array<Object>();
    this.allAssignedTasks.forEach(task => {
      let fAssignedTasks = moment(task.date).format('L');
      if (fAssignedTasks === this.formatDueDate)
        this.tasksByDate.push({ 'label': task.taskName, 'value': task })
    });
  }

  sendFeedback(){
    console.log("sendFeedback");
    //this.selectedTask.feedback = this.score;
    this.taskService.sendFeedback(this.selectedTask, this.score);
  }
}
