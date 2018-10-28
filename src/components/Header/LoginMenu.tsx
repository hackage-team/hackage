import * as React from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import { IUser } from '../../models/user';

interface IOuterProps {
  currentUser: IUser;
  logout: () => void;
}

const enhance = compose<{}, IOuterProps>();

type AllProps = IOuterProps & React.Props<{}>;

const LoginMenu = (props: AllProps) => {
  const { currentUser, logout } = props;

  return (
    <ul>
      <li>
        <Link to={{ pathname: `/users/${currentUser.uid}` }}>profile</Link>
      </li>
      <li>
        <button onClick={logout}>logout</button>
      </li>
    </ul>
  );
};

export default enhance(LoginMenu);
