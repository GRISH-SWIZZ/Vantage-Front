import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXZ4Pj__2NOHV9e99Ds0-nBLv8jfQrcIA",
  authDomain: "vantage-v1.firebaseapp.com",
  projectId: "vantage-v1",
  storageBucket: "vantage-v1.firebasestorage.app",
  messagingSenderId: "1078074596514",
  appId: "1:1078074596514:web:d9860c62a530a9e2a04bfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Phone auth helpers
export const setupRecaptcha = (containerId) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
  });
};

export const sendOTP = async (phoneNumber, appVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  } catch (error) {
    throw error;
  }
};

export default app;
