import * as appActions from '../actions/app.actions';

export interface State {
  event?: any;
  ticket?: any;
}

export const initialState: State = {
  event: null,
  ticket: null
};

export function reducer(state = initialState, action: appActions.AppActions): State {
  switch (action.type) {
    case appActions.AppActionTypes.SetEvent:
      return {
        ...state,
        event: action.payload
      };

    case appActions.AppActionTypes.RemoveEvent:
      return {
        ...state,
        event: null
      };

    case appActions.AppActionTypes.SetTicket:
      return {
        ...state,
        ticket: action.payload
      };

    case appActions.AppActionTypes.RemoveTicket:
      return {
        ...state,
        ticket: null
      };

    default:
      return state;
  }
}
