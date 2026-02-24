import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => AuthActions.loginSuccess({ user: response.user })),
          catchError(error => of(AuthActions.loginFailure({ error: error.error?.message || error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/dashboard']))
    ), { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.authService.logout())
    ), { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      exhaustMap(() =>
        this.authService.refreshSession().pipe(
          map(() => AuthActions.refreshTokenSuccess()),
          catchError(() => of(AuthActions.refreshTokenFailure()))
        )
      )
    )
  );

  refreshTokenFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshTokenFailure),
      tap(() => this.authService.logout())
    ), { dispatch: false }
  );
}
