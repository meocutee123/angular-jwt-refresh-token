import { Directive, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { catchError, map, Observable, of } from 'rxjs';

@Directive({
  selector: '[appAccountTakenValidator]',
})
@Injectable({ providedIn: 'root' })
export class AccountTakenValidatorDirective implements AsyncValidator {

  constructor(private _authenticationService: AuthenticationService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this._authenticationService.isAccountTaken(control.value).pipe(
      map(isTaken => (isTaken ? { uniqueAccount: true } : null)),
      catchError(() => of(null))
    )
  }

}
