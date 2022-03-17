import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '@app/_models/property';
import { PropertyService } from '@app/_services/property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  properties : Property[] = []

  constructor(private _propertyService : PropertyService,
    private _router : Router) { }

  ngOnInit(): void {
    this._propertyService.getAll()
      .subscribe(response => this.properties = response)
  }
  onPropertyClicked(id : number) : void {
    this._router.navigate(["secure/property", id ]);
  }
}
