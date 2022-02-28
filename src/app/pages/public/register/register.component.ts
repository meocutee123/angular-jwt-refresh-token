import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetFormFields } from '@app/_helpers/';
import { RegisterRequest } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { first } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required),
  });

  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls }

  register() : void {
    this.isSubmitted = true
    if (this.registerForm.invalid) return

    const registerRequest : RegisterRequest  = GetFormFields(this.registerForm, new RegisterRequest())

    this.authenticationService.register(registerRequest).pipe(first())
      .subscribe({
        next: () => {
          console.log("success")
        },
        error: error => {
          console.log(error);
        }
      });;
  }
}
