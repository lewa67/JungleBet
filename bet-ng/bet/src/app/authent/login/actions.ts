import {createAction, props} from '@ngrx/store';
// import { User } from '../../user.model';



export const login = createAction(
    "[Login Page] User Login",
    props<{payload:{username: string, role: string}}>()
);



export const logout = createAction(
  "[Top Menu] Logout"
);