import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as config from '../config/firebase-config.json';

firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export { db, firebase };
