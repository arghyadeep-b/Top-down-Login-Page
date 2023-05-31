
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider ,FacebookAuthProvider,TwitterAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYASVHt897CzvHQDrbOW6EPJlad9GYqdQ",
  authDomain: "hefork-7542d.firebaseapp.com",
  projectId: "hefork-7542d",
  storageBucket: "hefork-7542d.appspot.com",
  messagingSenderId: "910665598043",
  appId: "1:910665598043:web:7983c4cb5af4e1a5b7eb7e",
  measurementId: "G-18V4V76V13"
};


const app = initializeApp(firebaseConfig);


const ga = new GoogleAuthProvider(app);
const fa = new FacebookAuthProvider(app);
const ta = new TwitterAuthProvider(app);

const auth=getAuth(app);

const analytics = getAnalytics(app);

export{auth,ga,fa,ta};




