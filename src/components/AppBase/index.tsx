import * as React from 'react';
import { compose } from 'recompose';

import { IResponse } from '../../models/response';
import { IUser } from '../../models/user';

import Header from '../Header';
import Footer from '../Footer';

interface IOuterProps {
  currentUser: IResponse<IUser>;
}

const enhance = compose<{}, IOuterProps>();

type AllProps = IOuterProps & React.Props<{}>;

const AppBase = (props: AllProps) => {
  return (
    <>
      <Header currentUser={props.currentUser} />
      {props.children}
      <Footer />
    </>
  );
};

export default enhance(AppBase);
