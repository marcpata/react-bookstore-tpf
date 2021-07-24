import firebase from "firebase";

const apiConfig = process.env.REACT_APP_FIREBASE;
const apiString = JSON.parse(Buffer.from(apiConfig,'base64').toString("binary"));
var firebaseConfig = apiString;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.db = firebase.firestore();
firebase.auth = firebase.auth();

export default firebase;
