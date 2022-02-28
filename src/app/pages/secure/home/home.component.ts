import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthenticationService, UserService } from '@app/_services';

import {ErrorStateMatcher} from '@angular/material/core';
import { map, pipe } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myControl = new FormControl("", [Validators.required, Validators.email]);

  isDisabled : boolean = true;
  user : any = {}
  matcher = new MyErrorStateMatcher();
  /**
   *
   */
  constructor(private userService : UserService, private authenticationService : AuthenticationService) {
  }

  ngOnInit() {
    
  }

  getUser() : void {    
    if(this.myControl.invalid) return
    this.userService.findByEmailAddress(this.myControl.value)
  }

  refresh() : void {
    this.authenticationService.refreshToken().subscribe(res =>console.log(res));
  }

  logout() : void {
    this.authenticationService.logout();
  }
}
