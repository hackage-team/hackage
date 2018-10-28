import { Action, Reducer, Dispatch } from 'redux';
import { IUser, prepareCurrentUser, logout } from '../models/user';
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
  prepare = 'currentUser/listen',
  loading = 'currentUser/loading',
  logout = 'currentUser/logout',
  failure = 'currentUser/failure',
}

interface IPrepareAction extends Action<ActionName.prepare> {
  user: IUser | null;
}

export type CurrentUserAction =
  | IPrepareAction
  | Action<ActionName.logout>
  | Action<ActionName.loading>
  | Action<ActionName.failure>;

export const currentUserReducer: Reducer<ICurrentUserState, CurrentUserAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionName.prepare: {
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
    case ActionName.failure: {
      return {
        ...state,
        currentUser: { status: Status.failure, res: state.currentUser.res },
      };
    }
    default:
      return state;
  }
};

export const prepareCurrentUserAction = async (dispatch: Dispatch<CurrentUserAction>) => {
  dispatch({ type: ActionName.loading });

  try {
    const user = await prepareCurrentUser();
    const action: IPrepareAction = {
      type: ActionName.prepare,
      user: user,
    };
    dispatch(action);
  } catch (e) {
    console.error(e);
    dispatch({ type: ActionName.failure });
  }
};

export const logoutAction = async (dispatch: Dispatch<CurrentUserAction>) => {
  await logout();
  dispatch({ type: ActionName.logout });
};
