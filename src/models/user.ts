import { firebase, db } from '../lib/firebase';

export interface IUser {
  uid: string;
  name: string;
  avatorUrl?: string;
}

export const listenCurrentUser = (callback: (u: IUser | null) => void) => {
  firebase.auth().onAuthStateChanged(async userInfo => {
    if (userInfo === null) {
      callback(null);
      return;
    }

    const user = await fetchCurrentUserInfo(userInfo.uid);
    if (user) {
      callback(user);
      return;
    }

    // 認証完了しているがDBに存在していない状態なのでDBに保存する
    const newUser: IUser = {
      uid: userInfo.uid,
      name: userInfo.displayName || '名無しさん 🌱',
      avatorUrl: userInfo.photoURL || undefined,
    };
    await saveUser(newUser);
    callback(newUser);
  });
};

const fetchCurrentUserInfo = async (uid: string) => {
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
