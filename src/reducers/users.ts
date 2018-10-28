import { Action, Reducer, Dispatch } from 'redux';
import { IUser, fetchUserInfo } from '../models/user';
import { IResponse, Status } from '../models/response';

export interface IUsersState {
  users: {
    [uid: string]: IResponse<IUser> | undefined;
  };
}

const initialState: IUsersState = {
  users: {},
};

enum ActionName {
  set = 'users/set',
  loading = 'users/loading',
  failure = 'users/failure',
}

interface ISetAction extends Action<ActionName.set> {
  uid: string;
  user: IUser | null;
}

interface ILoadingAction extends Action<ActionName.loading> {
  uid: string;
}

interface IFailureAction extends Action<ActionName.failure> {
  uid: string;
}

export type UsersAction = ISetAction | ILoadingAction | IFailureAction;

export const usersReducer: Reducer<IUsersState, UsersAction> = (state = initialState, action): IUsersState => {
  switch (action.type) {
    case ActionName.set: {
      const resUser: IResponse<IUser> = {
        status: Status.success,
        res: action.user,
      };
      return {
        ...state,
        users: {
          [action.uid]: resUser,
        },
      };
    }
    case ActionName.loading: {
      const beforeResUser = state.users[action.uid];
      const resUser: IResponse<IUser> = {
        status: Status.loading,
        res: beforeResUser ? beforeResUser.res : null,
      };
      return {
        ...state,
        [action.uid]: resUser,
      };
    }
    case ActionName.failure: {
      const resUser: IResponse<IUser> = {
        status: Status.failure,
        res: null,
      };
      return {
        ...state,
        [action.uid]: resUser,
      };
    }
    default:
      return state;
  }
};

export const fetchUsersAction = async (dispatch: Dispatch<UsersAction>, uids: string[]) => {
  const tasks = uids.map(async uid => {
    const loadingAction: ILoadingAction = {
      type: ActionName.loading,
      uid: uid,
    };
    dispatch(loadingAction);

    try {
      const user = await fetchUserInfo(uid);
      const setAction: ISetAction = {
        type: ActionName.set,
        uid: uid,
        user: user,
      };
      dispatch(setAction);
    } catch (e) {
      console.error(e);
      const failureAction: IFailureAction = {
        type: ActionName.failure,
        uid: uid,
      };
      dispatch(failureAction);
    }
  });

  await Promise.all(tasks);
};
