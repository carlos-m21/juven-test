import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import * as appActions from '../actions/app.actions';
import * as fromRoot from '../reducers';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private store: Store<fromRoot.State>, private localStorage: LocalStorage) {}

  @Effect({ dispatch: false })
  setEvent$ = this.actions$.pipe(
    ofType(appActions.AppActionTypes.SetEvent),
    map((data: any) => {
      return this.localStorage.setItem('event', data.payload).subscribe();
    })
  );

  @Effect({ dispatch: false })
  removeEvent$ = this.actions$.pipe(
    ofType(appActions.AppActionTypes.RemoveEvent),
    map(() => {
      this.localStorage.removeItem('event').subscribe(() => {});
    })
  );

  @Effect({ dispatch: false })
  setTicket$ = this.actions$.pipe(
    ofType(appActions.AppActionTypes.SetTicket),
    map((data: any) => {
      return this.localStorage.setItem('ticket', data.payload).subscribe();
    })
  );

  @Effect({ dispatch: false })
  removeTicket$ = this.actions$.pipe(
    ofType(appActions.AppActionTypes.RemoveTicket),
    map(() => {
      this.localStorage.removeItem('ticket').subscribe();
    })
  );
}
