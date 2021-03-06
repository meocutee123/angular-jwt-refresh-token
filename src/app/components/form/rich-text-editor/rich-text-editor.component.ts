import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { isEmptyOrSpaces } from '@app/_helpers';
import { ContentChange, EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RichTextEditorComponent
    }
  ]
})
export class RichTextEditorComponent implements ControlValueAccessor {


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

  onValueChange(e: ContentChange): void {
    this.markAsTouched()    
    this.value = e.html || ''
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
