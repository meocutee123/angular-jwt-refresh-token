import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthenticationService, UserService } from '@app/_services';

import { ErrorStateMatcher } from '@angular/material/core';
import { map, pipe } from 'rxjs';
import { Stepper } from '@app/_interfaces';

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
  firstFormGroup!: FormGroup;

  stepper: Stepper[] = [
    // {
    // //   name: "Step 1", sections: [
    // //     {
    // //       heading: "Address", fields: [
    // //         { label: "Label 1", name:"address", type: "input", validation: false, class: ["m-5"] },
    // //       ]
    // //     },
    // //   ]
    // // },
    // // {
    // //   name: "Amenities", sections: [
    // //     {
    // //       heading: "Amenities", fields: [
    // //         { label: "Dish washer", name: "aminities", type: "input", validation: false },
    // //       ]
    // //     }
    // //   ]
    // },

  ]
  models: any = {
    name: null,
    amenities: null
  }

  isDisabled: boolean = true;
  user: any = {}
  matcher = new MyErrorStateMatcher();
  /**
   *
   */
  constructor(private userService: UserService, private authenticationService: AuthenticationService, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }

  getUser(): void {
    if (this.myControl.invalid) return
    this.userService.findByEmailAddress(this.myControl.value)
  }

  refresh(): void {
    this.authenticationService.refreshToken().subscribe(res => console.log(res));
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
