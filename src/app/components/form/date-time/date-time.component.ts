import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { isEmptyOrSpaces } from '@app/_helpers';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateTimeComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateTimeComponent
    }
  ]
})
export class DateTimeComponent implements ControlValueAccessor {
  @Input() validation: boolean = false;
  @Input() errorMessage: string = 'Value cannot be blank'

  value: string = ''

  hasError: boolean = false
  touched: boolean = false;
  disabled: boolean = false;
  firstRender: boolean = true;

  onChange = (value: string) => { };
  onValidatorChange = () => { }
  onTouched = () => { };

  constructor() { }

  onValueChange(e: MatDatepickerInputEvent<any, any>): void {
    this.markAsTouched()
    this.value = e.value.toISOString()
    this.onChange(this.value)
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.validation) return null

    if (this.firstRender) {
      this.firstRender = false
      return null
    } else {
      const value = control.value;
      if (isEmptyOrSpaces(value)) {
        this.hasError = true
        return {
          mustNotEmpty: {
            value
          }
        };
      }
      this.hasError = false
      return null
    }
  }
}
