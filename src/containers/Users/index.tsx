import * as React from 'react';
import { compose, withState } from 'recompose';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../reducers';
import { fetchUsersAction } from '../../reducers/users';
import { logoutAction } from '../../reducers/currentUser';

import { IResponse, Status } from '../../models/response';
import { IUser } from '../../models/user';

import Loading from '../../components/Loading';
import BaseLayout from '../../components/BaseLayout';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';

interface IMapStateProps {
  currentUser: IResponse<IUser>;
  targetUser?: IResponse<IUser>;
}

const mapStateToProps = (state: IRootState, ownProps: AllProps): IMapStateProps => ({
  currentUser: state.currentUserReducer.currentUser,
  targetUser: state.usersReducer.users[ownProps.match.params.uid],
});

interface IMapDispatchProps {
  fetchUser: (uid: string) => void;
  logout: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): IMapDispatchProps => ({
  fetchUser: (uid: string) => fetchUsersAction(dispatch, [uid]),
  logout: () => logoutAction(dispatch),
});

interface IInnerProps {
  isEditMode: boolean;
  setIsEditMode: (m: boolean) => void;
}

type AllProps = IInnerProps &
  IMapStateProps &
  IMapDispatchProps &
  RouteComponentProps<{ uid: string }> &
  React.Props<{}>;

const enhance = compose<{}, {}>(
  withState('isEditMode', 'setIsEditMode', false),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const UsersContainer = (props: AllProps) => {
  const { currentUser, targetUser, logout } = props;

  if (!targetUser || targetUser.status === Status.notYetRequest) {
    props.fetchUser(props.match.params.uid);
    return (
      <BaseLayout currentUser={currentUser} logout={logout}>
        <Loading />
      </BaseLayout>
    );
  }

  if (targetUser.status === Status.loading) {
    return (
      <BaseLayout currentUser={currentUser} logout={logout}>
        <Loading />
      </BaseLayout>
    );
  }

  if (!targetUser.res || targetUser.status === Status.failure) {
    return (
      <BaseLayout currentUser={currentUser} logout={logout}>
        <>読み込めませんでした...</>;
      </BaseLayout>
    );
  }

  const targetUserRes = targetUser.res;

  return (
    <BaseLayout currentUser={currentUser} logout={logout}>
      {(() => {
        if (currentUser.res && currentUser.res.uid === targetUserRes.uid) {
          if (props.isEditMode) {
            return (
              <>
                <ProfileEdit user={targetUserRes} />
                <button onClick={() => props.setIsEditMode(false)}>Cancel</button>
              </>
            );
          }

          return (
            <>
              <Profile user={targetUserRes} />
              <button onClick={() => props.setIsEditMode(true)}>Edit</button>
            </>
          );
        }
        return <Profile user={targetUserRes} />;
      })()}
    </BaseLayout>
  );
};

export default enhance(UsersContainer);
