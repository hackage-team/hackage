import { firebase, db } from '../lib/firebase';

const provider = new firebase.auth.GithubAuthProvider();

export interface IUser {
  uid: string;
  name: string;
  avatorUrl?: string;
}

const checkFirebaseLoginStatus = (): Promise<firebase.User | null> => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(async userInfo => {
      resolve(userInfo);
    });
  });
};

export const prepareCurrentUser = async () => {
  const userInfo = await checkFirebaseLoginStatus();
  if (userInfo === null) {
    return null;
  }

  const user = await fetchUserInfo(userInfo.uid);
  if (user) {
    return user;
  }

  // 認証完了しているがDBに存在していない状態なのでDBに保存する
  const newUser: IUser = {
    uid: userInfo.uid,
    name: userInfo.displayName || '名無しさん 🌱',
    avatorUrl: userInfo.photoURL || undefined,
  };

  await saveUser(newUser);
  return newUser;
};

export const fetchUserInfo = async (uid: string) => {
  const doc = await db.doc(`users/${uid}`).get();
  const res = doc.data();

  if (!res) {
    return null;
  }
  return res as IUser;
};

const saveUser = (user: IUser) => {
  return db.doc(`users/${user.uid}`).set(user);
};

export const loginWithGithub = async () => {
  try {
    await firebase.auth().signInWithPopup(provider);
    await checkFirebaseLoginStatus();
  } catch (e) {
    console.error(e);
  }
};

export const logout = async () => {
  await firebase.auth().signOut();
};
