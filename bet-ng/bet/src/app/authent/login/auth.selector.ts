import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from '../reducers/reducer';


export const selectAuthState = (state:AuthState)=>state["auth"]


export const isLoggedIn = createSelector(
    selectAuthState,
    auth => !!auth.user

);


export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);