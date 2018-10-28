import * as React from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import { IUser } from '../../models/user';

interface IOuterProps {
  currentUser: IUser;
}

const enhance = compose<{}, IOuterProps>();

type AllProps = IOuterProps & React.Props<{}>;

const LoginMenu = (props: AllProps) => {
  const { currentUser } = props;

  return (
    <ul>
      <li>
        <Link to={{ pathname: `/users/${currentUser.uid}` }}>profile</Link>
      </li>
      <li>
        <Link to={{ pathname: `/logout` }}>logout</Link>
      </li>
    </ul>
  );
};

export default enhance(LoginMenu);
