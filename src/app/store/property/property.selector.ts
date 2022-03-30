import { PropertyState } from "@app/app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const APP_KEY = 'propertyState'

export const getPropertyState = createFeatureSelector<PropertyState>(APP_KEY)

export const getAllProperties = createSelector( getPropertyState, (state: PropertyState) => state.properties )

export const getProperty = createSelector( getPropertyState, (state: PropertyState) => state.property)