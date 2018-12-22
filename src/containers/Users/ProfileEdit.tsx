import * as React from 'react';
import { compose } from 'recompose';

import { IUser } from '../../models/user';

interface IOuterProps {
  user: IUser;
}

const enhance = compose<{}, IOuterProps>();

type AllProps = IOuterProps & React.Props<{}>;

const ProfileEdit = (props: AllProps) => {
  const { user } = props;
  return (
    <>
      <>Edit</>
      <img src={user.avatorUrl} width="100px" />
      <p>{user.name}</p>
    </>
  );
};

export default enhance(ProfileEdit);
