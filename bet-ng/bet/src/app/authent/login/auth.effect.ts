import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActions} from './action-type';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { dispatch } from 'rxjs/internal/observable/pairs';


@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
        private router: Router) {

}

    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.login),
                tap(action => localStorage.setItem('user',
                        JSON.stringify(action.payload))
                )
            )
    ,
    {dispatch: false});

    logout$=createEffect(()=>{
        return this.actions$
        .pipe(
            ofType(AuthActions.logout),
            tap(action => {
                this.router.navigate(["/auth/login"])
                localStorage.removeItem('user')}
        ))
    }, {dispatch: false})

            }