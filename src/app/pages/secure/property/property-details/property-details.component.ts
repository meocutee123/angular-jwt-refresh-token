import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '@app/_models/property';
import { Store } from '@ngrx/store';
import * as FROM_PROPERTY_ACTIONS from '@app/store/property/property.actions';
import * as FROM_PROPERTY_SELECTOR from '@app/store/property/property.selector';
import { ProgressComponent } from '@app/components/progress/progress.component';
import { debounceTime, Observable } from 'rxjs';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('progress', { static: true }) appProgress!: ProgressComponent

  property$ : Observable<Property>

  constructor(private _store: Store,
    private _route: ActivatedRoute,
    private _router: Router) {
      this.property$ = this._store.select(FROM_PROPERTY_SELECTOR.getProperty)
  }

  ngOnInit(): void {
    const queryId = this._route.snapshot.paramMap.get('id');

    if (queryId != null) {
      const propertyId: number = parseInt(queryId)

      isNaN(propertyId) && this._router.navigate(['back-office/properties'])
      this._store.dispatch(FROM_PROPERTY_ACTIONS.getPropertyByKeyAction({ key: propertyId }))
    }
  }


  ngOnDestroy(): void {

  }
}
