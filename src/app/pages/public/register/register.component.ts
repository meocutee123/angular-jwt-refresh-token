import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountTakenValidatorDirective } from '@app/directives/account-taken-validator/account-taken-validator.directive';
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
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this._accountTakenValidator.validate.bind(this._accountTakenValidator)],
      updateOn: 'blur'
    }),
    password: new FormControl("", Validators.required),
    confirmPassword: new FormControl("", Validators.required),
  });

  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(private authenticationService: AuthenticationService, private _accountTakenValidator: AccountTakenValidatorDirective) { }

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
