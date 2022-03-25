import { Component, OnInit } from '@angular/core';
import { Tile } from '@app/_interfaces';
import { UserService } from '@app/_services';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  pageTitle: string = 'Landing page';
  myDate: Date = new Date();

  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  getUsers() {
    this.userService.getAll().subscribe(res => console.log(res))
  }
}
