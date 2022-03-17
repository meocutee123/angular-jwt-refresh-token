import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from '@app/_models/property';
import { PropertyService } from '@app/_services/property.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-lease-edit',
  templateUrl: './lease-edit.component.html',
  styleUrls: ['./lease-edit.component.scss']
})
export class LeaseEditComponent implements OnInit {

  isSubmitted: boolean = false;

  dynamicForm: FormGroup = new FormGroup({})
  hashmap: any[] = []


  conditions: any[] = [
    { key: 1, value: "Good" },
    { key: 2, value: "Fair" },
    { key: 3, value: "Poor" },
  ];

  properties: Property[] = []
  property: Property = null as any;
  constructor(private fb: FormBuilder, private _propertyService: PropertyService) {
  }

  get f() { return this.dynamicForm.controls; }
  get fa() { return this.f['additional'] as FormArray; }

  get extrasInformation() { return this.fa.controls as FormGroup[]; }

  ngOnInit(): void {
    this.dynamicForm = this.fb.group({
      description: ['', Validators.required],
      condition: [''],
      color: [''],
      additional: new FormArray([])
    })

    this._propertyService.getByKey(1).pipe(first()).subscribe(property => {
      // this.f['description'].setValue(property.description)
      // this.f['condition'].setValue(property.condition)
      // this.f['color'].setValue(property.color)

      // const { additional: extrasInformation } = property

      // if (extrasInformation.length) {

      //   extrasInformation.forEach(item => {
      //     this.fa.push(this.fb.group({ ['' + item.key]: [item.value, Validators.required] }))
      //     this.hashmap.push(item)
      //   })

      // }
    });

  }

  onReset(): void {
    this.dynamicForm.reset()
  }


}
