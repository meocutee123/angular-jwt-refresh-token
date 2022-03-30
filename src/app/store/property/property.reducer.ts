import { PropertyState } from '@app/app.state';
import { Action, createReducer, on } from '@ngrx/store';
import * as FROM_PROPERTY_ACTIONS from './property.actions';

export const initialState: PropertyState = {
  properties: [],
  property: null as any
};

const propertyReducer = createReducer(
  initialState,
  on(FROM_PROPERTY_ACTIONS.getAllPropertiesSuccessAction, (state, { properties }) => ({ ...state, properties })),
  on(FROM_PROPERTY_ACTIONS.getPropertyByKeySuccessAction, (state, { property }) => ({...state, property })),
);

export function reducer(state: any, action: Action) {
  return propertyReducer(state, action);
}