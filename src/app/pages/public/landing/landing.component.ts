import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  pageTitle : string = 'Landing page';
  myDate : Date = new Date();

  constructor(private userService :UserService) { }

  ngOnInit(): void {
  }
  getUsers() {
    this.userService.getAll().subscribe(res => console.log(res))
  }
}
