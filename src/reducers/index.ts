import { combineReducers, createStore, Store } from 'redux';

import { ICurrentUserState, currentUserReducer } from './currentUser';
import { IUsersState, usersReducer } from './users';

export interface IRootState {
  currentUserReducer: ICurrentUserState;
  usersReducer: IUsersState;
}

export const rootStore: Store<IRootState> = createStore(
  combineReducers({
    currentUserReducer,
    usersReducer,
  })
);
