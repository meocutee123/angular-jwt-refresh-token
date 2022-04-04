import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckValidity, GetFormFields, isElementVisible } from '@app/_helpers';
import { Property } from '@app/_models/property';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.scss']
})
export class PropertyAddComponent implements OnInit, OnDestroy {

  isSubmitted: boolean = false;
  options: any[] = [
    { value: '0', text: 'Email Address' },
    { value: '1', text: 'Phone Numbere' }
  ]
  form: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder) {
  }

  get f() { return this.form.controls; }
  get ffeatures() { return this.f['otherFeatures'] as FormArray; }
  get fadditionalInformation() { return this.f['additionalInformation'] as FormArray }
  get flandlordInformation() { return this.f['landlordInformation'] as FormArray }

  ngOnInit(): void {
    this.form = this.fb.group({
      streetAddress: ['', Validators.required],
      unit: ['', Validators.required],
      city: [''],
      state: [''],
      zipCode: [''],
      propertyType: [''],
      buidingAge: [''],
      rooms: [''],
      baths: [''],
      otherFeatures: new FormArray([]),
      highlights: [''],
      additionalInformation: new FormArray([]),
      landlordInformation: new FormArray([]),
      preferredContactMethod: ['', Validators.required],
      date: ['']
    })
    window.addEventListener('scroll', this.onScroll, true)
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll, true)
  }

  onScroll(): void {
    const isGalleryVisibile = isElementVisible(document.querySelector("#gallery"))
    const isHightlightsVisible = isElementVisible(document.querySelector("#highlights"))
    const isInformationVisible = isElementVisible(document.querySelector("#information"))

    const formProgress = document.querySelector('.form-progress')
    if (!formProgress) return

    const lis = [...formProgress.querySelectorAll('li')]
    if (isGalleryVisibile || isHightlightsVisible || isInformationVisible) {
      lis.forEach(li => li.classList.remove('active'))
      if (isInformationVisible) {
        lis[8].classList.add('active')
        return
      }
      if (isHightlightsVisible) {
        lis[4].classList.add('active')
        return
      }
      if (isGalleryVisibile) {
        lis[2].classList.add('active')
        return
      }
    }

    lis.forEach(li => li.classList.remove('active'))
    lis[0].classList.add('active')
  }

  onSubmit(): void {
    this.isSubmitted = true

    const property: Property = GetFormFields(this.form, new Property())
    console.log(property);
    const isFormValid = CheckValidity(this.form)

    if (isFormValid) {
    }

  }

  addFeatures(payload: any): void {
    
    const { value, formArrayName } = payload
    const fieldIndex = this.isFieldExist(value.fieldAlias)
    if (fieldIndex != -1) {
      document.querySelector(`#feature-${fieldIndex}`)?.classList.add('invalid')
      alert('Duplicate property aliases not allowed')
      return
    }

    const formArray = this.f[formArrayName] as FormArray
    formArray.push(this.fb.group({
      label: new FormControl(value.label, Validators.required),
      fieldAlias: new FormControl(value.fieldAlias, Validators.required),
      value: new FormControl(value.value, Validators.required),
    }))
  }

  isFieldExist(field: string): number {
    return this.ffeatures.getRawValue().findIndex(control => control.fieldAlias == field)
  }

  onOtherFeatureChange(e: any) {
    this.ffeatures.controls[e.index].patchValue({ value: e.value })
  }
  onAdditionalInformationChange(e: any) {
    this.fadditionalInformation.controls[e.index].patchValue({ value: e.value })
  }
  onLandlordCInformationhange(e: any) {
    this.flandlordInformation.controls[e.index].patchValue({ value: e.value })
  }

  onFieldRemove(index: number): void {
    this.ffeatures.removeAt(index)
  }


}
