import * as React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { firebase } from '../../lib/firebase';

import { IRootState } from '../../reducers';
import { listenCurrentUserAction } from '../../reducers/currentUser';

import { IResponse, Status } from '../../models/response';
import { IUser } from '../../models/user';

import Loading from '../../components/Loading';

const provider = new firebase.auth.GithubAuthProvider();

interface IMapStateProps {
  currentUser: IResponse<IUser>;
}

const mapStateToProps = (state: IRootState): IMapStateProps => ({
  currentUser: state.currentUserReducer.currentUser,
});

interface IMapDispatchProps {
  listenUser: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): IMapDispatchProps => ({
  listenUser: () => listenCurrentUserAction(dispatch),
});

type AllProps = IMapStateProps & IMapDispatchProps & React.Props<{}>;

const enhance = compose<{}, {}>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const LoginContainer = (props: AllProps) => {
  const { currentUser } = props;
  if (currentUser.status === Status.notYetRequest) {
    props.listenUser();
    return <Loading />;
  }

  return (
    <>
      <div>LoginContainer</div>
      <button
        onClick={async () => {
          const result = await firebase.auth().signInWithPopup(provider);
          console.log(result);
        }}
      >
        Login with Github
      </button>
    </>
  );
};

export default enhance(LoginContainer);
