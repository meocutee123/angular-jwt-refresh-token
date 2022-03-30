import { Injectable } from "@angular/core";
import { PropertyService } from "@app/_services/property.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, filter, first, map, mergeMap, of, switchMap, take } from "rxjs";
import * as FROM_PROPERTY_ACTIONS from './property.actions'

@Injectable()
export class PropertyEffects {

  constructor(private _actions: Actions,
    private _propertyService: PropertyService) {
  }

  loadProperties$ = createEffect(() => this._actions.pipe(
    ofType(FROM_PROPERTY_ACTIONS.getAllPropertiesAction),
    mergeMap(() => this._propertyService.getProperties()
      .pipe(
        map(properties => FROM_PROPERTY_ACTIONS.getAllPropertiesSuccessAction({ properties })),
        catchError(() => of({ type: '[Property / API] Properties Loaded Error' }))
      ))
  ))

  loadProperty$ = createEffect(() => this._actions.pipe(
    ofType(FROM_PROPERTY_ACTIONS.getPropertyByKeyAction),
    map(action => action.key),
    filter(key => typeof(key) != 'undefined'),
    switchMap(key => this._propertyService.getByKey(key).pipe(
      map(property => FROM_PROPERTY_ACTIONS.getPropertyByKeySuccessAction({ property })),
      catchError(() => of({ type: '[Property / API] Property Loaded Error' }))
    ))
  ))
}