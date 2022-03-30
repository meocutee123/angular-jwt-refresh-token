import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OtherFeaturesComponent } from '@app/components/form/other-features/other-features.component';
import { GetFormFields, isEmptyOrSpaces } from '@app/_helpers';
import { Property } from '@app/_models/property';
import { PropertyOtherFeature } from '@app/_models/property-other-feature';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.scss']
})
export class PropertyAddComponent implements OnInit {
  @ViewChild('otherFearures', { static: true }) otherFearures!: OtherFeaturesComponent

  isSubmitted: boolean = false;

  dynamicForm: FormGroup = new FormGroup({})

  conditions: any[] = [
    { key: 1, value: "Good" },
    { key: 2, value: "Fair" },
    { key: 3, value: "Poor" },
  ];

  properties: Property[] = []
  property: Property = null as any;
  constructor(private fb: FormBuilder) {
  }

  get f() { return this.dynamicForm.controls; }
  get fa() { return this.f['features'] as FormArray; }
  get ofs() { return this.fa.controls as FormGroup[]; }

  ngOnInit(): void {
    this.dynamicForm = this.fb.group({
      totalQuantity: [60, [Validators.required, Validators.max(100)]],
      streetAddress: ['', Validators.required],
      unit: ['', Validators.required],
      city: [''],
      state: [''],
      zipCode: [''],
      features: new FormArray([])
    })
  }

  onReset(): void {
    this.dynamicForm.reset()
  }

  onSubmit(): void {
    this.isSubmitted = true
    // if(this.dynamicForm.invalid) return
    
    const property: Property = GetFormFields(this.dynamicForm, new Property())
    console.log(property);
    
  }

  addFeatures(e : PropertyOtherFeature): void {
    const fieldIndex = this.isFieldExist(e.fieldAlias)
    if (fieldIndex != -1) {
      document.querySelector(`#feature-${fieldIndex}`)?.classList.add('invalid')
      alert('Duplicate property aliases not allowed')
      return
    }

    this.fa.push(this.fb.group({
      label: new FormControl(e.label, Validators.required),
      fieldAlias: new FormControl(e.fieldAlias, Validators.required),
      value: new FormControl(e.value, Validators.required),
    }))

    this.otherFearures.isAddingFeaturesActive = false;
    this.otherFearures.onCanceled()
  }

  isFieldExist(field: string): number {
    return this.fa.getRawValue().findIndex(control => control.fieldAlias == field)
  }

  onOtherFeatureChange(e: any) {
    this.fa.controls[e.index].patchValue({ value: e.value })
  }

  onFieldRemove(index: number): void {
    this.fa.removeAt(index)
  }

  
}
