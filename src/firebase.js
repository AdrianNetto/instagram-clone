// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-88b74.firebaseapp.com",
  projectId: "insta-next-88b74",
  storageBucket: "insta-next-88b74.appspot.com",
  messagingSenderId: "921421816198",
  appId: "1:921421816198:web:f5df792fd3214470344c07",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// RULES FOR FIREBASE BELOW

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }
