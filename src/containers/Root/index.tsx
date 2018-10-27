import * as React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { IRootState } from '../../reducers';
import { listenCurrentUserAction } from '../../reducers/currentUser';

import { IResponse, Status } from '../../models/response';
import { IUser } from '../../models/user';

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

//
// 何もレンダリングしないContainer
// どの画面でも必ず走らせたい処理などをここに書く
//
const RootContainer = (props: AllProps) => {
  const { currentUser } = props;
  if (currentUser.status === Status.notYetRequest) {
    props.listenUser();
  }

  return null;
};

export default enhance(RootContainer);
