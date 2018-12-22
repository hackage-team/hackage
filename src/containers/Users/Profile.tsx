import * as React from 'react';
import { compose } from 'recompose';

import { IUser } from '../../models/user';

interface IOuterProps {
  user: IUser;
}

const enhance = compose<{}, IOuterProps>();

type AllProps = IOuterProps & React.Props<{}>;

const Profile = (props: AllProps) => {
  const { user } = props;
  return (
    <>
      <img src={user.avatorUrl} width="100px" />
      <p>{user.name}</p>
    </>
  );
};

export default enhance(Profile);
