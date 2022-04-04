import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RadioGroupComponent
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor {

  @Input() label: string = ''
  @Input() options: any[] = []
  @Input() errorMessage: string = 'Value cannot be blank'
  @Input() validation: boolean = false
  value: string = ''

  hasError: boolean = false
  touched: boolean = false;
  disabled: boolean = false;
  firstRender: boolean = true;


  onChange = (value: string) => { };
  onValidatorChange = () => { }
  onTouched = () => { };

  onValueChange(e: MatRadioChange): void {
    this.markAsTouched()
    this.value = e.value
    this.onChange(this.value)
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null
  }

}
