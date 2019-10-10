import * as store from "@ngrx/store";
import { on } from '@ngrx/store';
import { AuthActions } from '../login/action-type';

export interface AuthState{
   user:{ username: string,
    role: string[]}
}

export const initialAuthState: AuthState =  {
   user:undefined

};

export const authReducer=store.createReducer(
     initialAuthState,
     on(AuthActions.login, function(state,action){
       return {user:{username: action.payload.username, role: [action.payload.role]}}
     }),
     on(AuthActions.logout, (state,action)=>{
       return { user:undefined}
     })

)