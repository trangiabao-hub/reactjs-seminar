// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4KXxNX7sZrBsIlKnPEJDLPPi1JoqvcV4",
  authDomain: "notification-6c96d.firebaseapp.com",
  projectId: "notification-6c96d",
  storageBucket: "notification-6c96d.firebasestorage.app",
  messagingSenderId: "581573831663",
  appId: "1:581573831663:web:9d560b65665aa85afba41a",
  measurementId: "G-DVECQJ7HWV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
