import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  private score: number;
  constructor() { }

  ngOnInit() {
  }

}
