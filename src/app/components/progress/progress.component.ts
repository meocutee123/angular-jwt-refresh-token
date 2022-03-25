import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input('color') color: string = 'accent'

  hidden: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  show() { this.hidden = true }
  hide() { this.hidden = false }
}
