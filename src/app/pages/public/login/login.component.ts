import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetFormFields } from '@app/_helpers';
import { AuthenticateRequest } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  returnUrl: string = ""

  isSubmitted: boolean = false;
  isLoading: boolean = false;
  error: string = ""
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }

  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() { return this.loginForm.controls; }

  login(): void {
    this.isSubmitted = true;

    if (this.loginForm.invalid) { return }
    this.isLoading = true;

    const loginRequest : AuthenticateRequest = GetFormFields(this.loginForm, new AuthenticateRequest());

    this.authenticationService.login(loginRequest)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.error = error;
          this.isLoading = false;
        }
      });
  }
}
