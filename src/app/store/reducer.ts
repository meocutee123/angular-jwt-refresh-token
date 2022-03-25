import { ActionReducerMap } from "@ngrx/store";

import * as FROM_PROPERTY_REDUCER from './property/property.reducer'
import { AppState } from "@app/app.state";  

export const reducer : ActionReducerMap<AppState> = {
  propertyState: FROM_PROPERTY_REDUCER.reducer
}