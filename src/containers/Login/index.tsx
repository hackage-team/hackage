import * as React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { firebase } from '../../lib/firebase';

import { IRootState } from '../../reducers';

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

type AllProps = IMapStateProps & React.Props<{}>;

const enhance = compose<{}, {}>(connect(mapStateToProps));

const LoginContainer = (props: AllProps) => {
  const { currentUser } = props;
  if (currentUser.status === Status.notYetRequest || currentUser.status === Status.loading) {
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
