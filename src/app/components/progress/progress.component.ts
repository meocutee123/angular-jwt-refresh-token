import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input('color') color: string = 'accent'

  hidden: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  show() { this.hidden = false }
  hide() { this.hidden = true }
}
