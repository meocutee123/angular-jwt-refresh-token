import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '@app/_models/property';
import { PropertyService } from '@app/_services/property.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  property: Property = null as any;

  constructor(private _propertyService: PropertyService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {

    const queryId = this._route.snapshot.paramMap.get('id');

    if (queryId != null) {
      const propertyId: number = parseInt(queryId)

      isNaN(propertyId) && this._router.navigate(['back-office/properties'])

      this._propertyService.getByKey(propertyId)
        .subscribe(result => this.property = result)
    }
  }

}
