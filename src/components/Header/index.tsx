import * as React from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';

import { IResponse, Status } from '../../models/response';
import { IUser } from '../../models/user';

import LoginMenu from './LoginMenu';

interface IOuterProps {
  currentUser: IResponse<IUser>;
  logout: () => void;
}

const enhance = compose<{}, IOuterProps>();

type AllProps = IOuterProps & React.Props<{}>;

const Header = (props: AllProps) => {
  const { currentUser, logout } = props;
  const { status, res } = currentUser;

  const StatusMenu = () => {
    if (status === Status.success && res) {
      return <LoginMenu currentUser={res} logout={logout} />;
    }
    return <Link to={{ pathname: '/login' }}>login</Link>;
  };

  return (
    <>
      <h1>
        <Link to={'/'}>Hackage</Link>
      </h1>
      <StatusMenu />
      <hr />
    </>
  );
};

export default enhance(Header);
