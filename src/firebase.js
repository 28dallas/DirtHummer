import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCBZO17dzEFF2fC2g1NbF8p2qnHgxUhdvI",
  authDomain: "dirthummer.firebaseapp.com",
  projectId: "dirthummer",
  storageBucket: "dirthummer.firebasestorage.app",
  messagingSenderId: "239347447702",
  appId: "1:239347447702:web:640fd1e0dde15507bc0fb7",
  measurementId: "G-JT7SJJP9KJ"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
