import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';

import { authReducer } from '../authent/reducers/reducer';
  
  export interface AppState {
  
  }
  
  export const reducers: ActionReducerMap<AppState> = {
      auth: authReducer
  };
  
  export function logger(reducer:ActionReducer<any>)
      : ActionReducer<any> {
      return (state, action) => {
          console.log("state before: ", state);
          console.log("action", action);
  
          return reducer(state, action);
      }
  
  }
  
  
  export const metaReducers: MetaReducer<AppState>[] =
      !environment.production ? [logger] : [];
  