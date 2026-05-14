import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDVMy5rk00tsOx1uWrgXosaw6s2pD6IhwQ",
  authDomain: "donata-f3d10.firebaseapp.com",
  databaseURL: "https://donata-f3d10-default-rtdb.firebaseio.com",
  projectId: "donata-f3d10",
  storageBucket: "donata-f3d10.firebasestorage.app",
  messagingSenderId: "107465588600",
  appId: "1:107465588600:web:0d6d416b8cdd7634c4d28d"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export default app;