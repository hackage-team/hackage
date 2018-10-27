import { combineReducers, createStore, Store } from 'redux';

import { ICurrentUserState, currentUserReducer } from './currentUser';

export interface IRootState {
  currentUserReducer: ICurrentUserState;
}

export const rootStore: Store<IRootState> = createStore(
  combineReducers({
    currentUserReducer,
  })
);
