const firebaseConfig = {
  apiKey: "SUA_API_KEY_REAL",
  authDomain: "rifa-elliot.firebaseapp.com",
  projectId: "rifa-elliot",
  storageBucket: "rifa-elliot.appspot.com",
  messagingSenderId: "758339716307",
  appId: "SEU_APP_ID_REAL"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();