import * as React from 'react';
import { compose } from 'recompose';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../reducers';
import { fetchUsersAction } from '../../reducers/users';

import { IResponse, Status } from '../../models/response';
import { IUser } from '../../models/user';

import Loading from '../../components/Loading';

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
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): IMapDispatchProps => ({
  fetchUser: (uid: string) => fetchUsersAction(dispatch, [uid]),
});

type AllProps = IMapStateProps & IMapDispatchProps & RouteComponentProps<{ uid: string }> & React.Props<{}>;

const enhance = compose<{}, {}>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const UsersContainer = (props: AllProps) => {
  const { targetUser } = props;
  if (!targetUser || targetUser.status === Status.notYetRequest) {
    props.fetchUser(props.match.params.uid);
    return <Loading />;
  }

  if (targetUser.status === Status.loading) {
    return <Loading />;
  }

  if (targetUser.status === Status.failure || !targetUser.res) {
    return <>読み込めませんでした...</>;
  }

  return (
    <>
      <div>{JSON.stringify(targetUser)}</div>
    </>
  );
};

export default enhance(UsersContainer);
