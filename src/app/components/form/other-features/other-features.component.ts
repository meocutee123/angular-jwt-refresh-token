import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { GetFormFields, isEmptyOrSpaces } from '@app/_helpers';
import { PropertyOtherFeature } from '@app/_models/property-other-feature';

@Component({
  selector: 'app-other-features',
  templateUrl: './other-features.component.html',
  styleUrls: ['./other-features.component.scss']
})
export class OtherFeaturesComponent implements OnInit {

  @ViewChild('label', { static: true }) label!: MatInput;

  @Output() featureAdded: EventEmitter<PropertyOtherFeature> = new EventEmitter<PropertyOtherFeature>()
  @Output() featureChanged: EventEmitter<any> = new EventEmitter<any>()

  isAddingFeaturesActive: boolean = true;
  hashmap: any[] = []

  activeFeature: FormGroup = new FormGroup({
    label: new FormControl('', [Validators.required]),
    fieldAlias: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  })

  get af() { return this.activeFeature.controls; }

  constructor() { }

  ngOnInit(): void {
  }
  onFeatureAdded(e: any): void {
    e.preventDefault()
    if (this.activeFeature.invalid) {
      this.activeFeature.markAllAsTouched()
      return
    }
    const feature: PropertyOtherFeature = GetFormFields(this.activeFeature, new PropertyOtherFeature())

    this.hashmap.push(feature)
    this.activeFeature.reset()
    this.featureAdded.emit(feature)
  }
  onCanceled(): void {
    this.activeFeature.reset()
    this.isAddingFeaturesActive = true;
  }
  onOtherFeatureChange(e: KeyboardEvent, index: number): void {
    const el = e.target as HTMLInputElement
    this.featureChanged.emit({ index, value: el.value })
  }
  onActiveLabelChange(value: string): void {
    if (isEmptyOrSpaces(value)) {
      this.activeFeature.controls['fieldAlias'].setValue('Enter alias...')
      return
    }

    const fieldAlias: string = value.trim().charAt(0).toLowerCase() + value.slice(1).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    this.activeFeature.controls['fieldAlias'].setValue(fieldAlias)
  }
  onFieldRemove(index: number): void {
    this.hashmap.splice(index, 1)
  }
  addFeatures() {
    this.isAddingFeaturesActive = false;
    setTimeout(() => {
      this.label.focus()
    });
  }
}
