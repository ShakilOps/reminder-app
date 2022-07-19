import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfPKLGPsoaEa0LDEVIs1swyVhUd0Mhp0w",
  authDomain: "reminderauth-9a4b5.firebaseapp.com",
  projectId: "reminderauth-9a4b5",
  storageBucket: "reminderauth-9a4b5.appspot.com",
  messagingSenderId: "297945895023",
  appId: "1:297945895023:web:e62840d099ff5b8825fd9a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      return result.user;
    })
    .catch((error) => {
      console.log(error);
    });
};
