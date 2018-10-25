import * as firebase from 'firebase';
import * as config from '../config/firebase-config.json';

firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export { db, firebase };
