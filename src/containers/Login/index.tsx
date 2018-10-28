import * as React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { Redirect } from 'react-router-dom';

import { IRootState } from '../../reducers';
import { prepareCurrentUserAction } from '../../reducers/currentUser';

import { IResponse, Status } from '../../models/response';
import { IUser, loginWithGithub } from '../../models/user';

import Footer from '../../components/Footer';

interface IMapStateProps {
  currentUser: IResponse<IUser>;
}

const mapStateToProps = (state: IRootState): IMapStateProps => ({
  currentUser: state.currentUserReducer.currentUser,
});

interface IMapDispatchProps {
  prepareUser: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): IMapDispatchProps => ({
  prepareUser: () => prepareCurrentUserAction(dispatch),
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

  if (currentUser.status === Status.success && currentUser.res) {
    return <Redirect to={{ pathname: `/users/${currentUser.res.uid}` }} />;
  }

  if (currentUser.status === Status.failure) {
    return <>ログイン状態の確認に失敗しました...</>;
  }

  return (
    <>
      <div>LoginContainer</div>
      <button
        onClick={async () => {
          await loginWithGithub();
          await props.prepareUser();
        }}
      >
        Login with Github
      </button>
      <Footer />
    </>
  );
};

export default enhance(LoginContainer);
