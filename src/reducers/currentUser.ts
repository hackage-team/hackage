// import * as _ from "lodash"
import { Action, Reducer, Dispatch } from 'redux';
import { IUser, listenCurrentUser } from '../models/user';
import { IResponse, Status } from '../models/response';

export interface ICurrentUserState {
  currentUser: IResponse<IUser>;
}

const initialState: ICurrentUserState = {
  currentUser: {
    status: Status.notYetRequest,
    res: null,
  },
};

enum ActionName {
  listen = 'currentUser/listen',
  loading = 'currentUser/loading',
  logout = 'currentUser/logout',
}

interface IListenAction extends Action<ActionName.listen> {
  user: IUser | null;
}

export type CurrentUserAction = IListenAction | Action<ActionName.logout> | Action<ActionName.loading>;

export const currentUserReducer: Reducer<ICurrentUserState, CurrentUserAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionName.listen: {
      return {
        ...state,
        currentUser: { status: Status.success, res: action.user },
      };
    }
    case ActionName.logout: {
      return {
        ...state,
        currentUser: { status: Status.success, res: null },
      };
    }
    case ActionName.loading: {
      return {
        ...state,
        currentUser: { status: Status.loading, res: state.currentUser.res },
      };
    }
    default:
      return state;
  }
};

export const listenCurrentUserAction = (dispatch: Dispatch<CurrentUserAction>) => {
  dispatch({ type: ActionName.loading });
  listenCurrentUser(user => {
    const action: IListenAction = {
      type: ActionName.listen,
      user: user,
    };
    dispatch(action);
  });
};
