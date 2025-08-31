

// import { initializeApp } from "firebase/app";
// import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// import firebaseConfig from "./firebase.config";

// const initializeAuthentication = () => {
//     const app = initializeApp(firebaseConfig);
//     const auth = getAuth(app);
    
//     // Enable session persistence
//     setPersistence(auth, browserLocalPersistence)
//         .then(() => {
//             console.log("Firebase authentication session persisted");
//         })
//         .catch((error) => {
//             console.error("Error enabling session persistence:", error.message);
//         });
// };

// export default initializeAuthentication;


import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "./firebase.config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Enable session persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase authentication session persisted");
  })
  .catch((error) => {
    console.error("Error enabling session persistence:", error.message);
  });

// Set up Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

