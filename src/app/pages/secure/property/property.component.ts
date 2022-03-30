import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressComponent } from '@app/components/progress/progress.component';
import * as FROM_PROPERTY_ACTIONS from '@app/store/property/property.actions';
import * as FROM_PROPERTY_SELECTOR from '@app/store/property/property.selector';
import { Property } from '@app/_models/property';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @ViewChild('progress', { static: true }) appProgress!: ProgressComponent

  properties$: Observable<Property[]>

  constructor(
    private _router: Router,
    private _store: Store) {
    this.properties$ = this._store.select(FROM_PROPERTY_SELECTOR.getAllProperties)
  }

  ngOnInit(): void {
    this._store.dispatch(FROM_PROPERTY_ACTIONS.getAllPropertiesAction())
  }

  onPropertyClicked(id: number): void {
    this._router.navigate(["secure/property", id]);
  }
}
