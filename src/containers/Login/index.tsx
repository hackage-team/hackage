import * as React from 'react';
import { firebase } from '../../lib/firebase';

const provider = new firebase.auth.GithubAuthProvider();

const LoginContainer = () => {
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

export default LoginContainer;
