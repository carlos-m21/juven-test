import { Action } from '@ngrx/store';

export enum AppActionTypes {
  SetEvent = '[App] Set Event',
  RemoveEvent = '[App] Remove Event',
  SetTicket = '[App] Set Ticket',
  RemoveTicket = '[App] Remove Ticket'
}

export class SetEvent implements Action {
  readonly type = AppActionTypes.SetEvent;
  constructor(public payload: any) {}
}

export class RemoveEvent implements Action {
  readonly type = AppActionTypes.RemoveEvent;
}

export class SetTicket implements Action {
  readonly type = AppActionTypes.SetTicket;
  constructor(public payload: any) {}
}

export class RemoveTicket implements Action {
  readonly type = AppActionTypes.RemoveTicket;
}

export type AppActions = SetEvent | RemoveEvent | SetTicket | RemoveTicket;
