import { CallState } from '@app/app.state';
import { Property } from '@app/_models/property';
import { createAction, props } from '@ngrx/store';


export const getAllPropertiesAction = createAction('[Properties / Api] Get All')

export const getAllPropertiesSuccessAction = createAction(
  '[Properties / Api] Properties Loaded Success',
  props<{ payload : Array<Property>}>());

export const getPropertyByKeyAction = createAction(
  '[Property / Api] Get By Key',
  props<{ key: number}>()
)
export const getPropertyByKeySuccessAction = createAction(
  '[Property / Api] Get By Key',
  props<{ payload: Property}>()
)
export const addPropertyAction = createAction(
  '[Properties / Api] Add Property',
  props<{ property : Property }>()
);

export const removePropertyAction = createAction(
  '[Properties / Api] Remove Property',
  props<{ property : Property }>()
);