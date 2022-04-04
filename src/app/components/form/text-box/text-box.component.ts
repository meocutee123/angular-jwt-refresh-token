import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { isEmptyOrSpaces } from '@app/_helpers';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextBoxComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TextBoxComponent
    }
  ]
})
export class TextBoxComponent implements ControlValueAccessor, Validator {

  @Input() label: string = ''
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

  onValueChange(e: Event): void {
    const el = e.currentTarget as HTMLInputElement
    this.markAsTouched()
    this.value = el.value
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

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {

    if(!this.validation) return null

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
