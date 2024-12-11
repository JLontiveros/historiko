import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAnUlJTDnXMVUHCQuQcJMBQSNUNoSe9l4A",
  authDomain: "historiko.firebaseapp.com",
  projectId: "historiko",
  storageBucket: "historiko.appspot.com",
  messagingSenderId: "259255503376",
  appId: "1:259255503376:web:384f565d4eb4a9afebd895"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
export { storage };