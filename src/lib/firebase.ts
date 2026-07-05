import { initializeApp, getApp, getApps } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword as realSignIn, 
  createUserWithEmailAndPassword as realSignUp,
  updateProfile as realUpdateProfile 
} from "firebase/auth";

const hasFirebaseKeys = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-api-key-for-builds",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "mock-sender",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "mock-app-id",
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = typeof window !== "undefined" || hasFirebaseKeys ? getAuth(app) : ({} as any);

// Mock wrappers to enable local testing without Firebase environment variables
export const signInWithEmailAndPassword = async (authObj: any, email: string, password: string): Promise<any> => {
  if (!hasFirebaseKeys) {
    console.log("Mock Firebase Auth: Logging in test user", email);
    return {
      user: {
        uid: "mock-user-123",
        email: email,
        displayName: email.split("@")[0],
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      }
    };
  }
  return realSignIn(authObj, email, password);
};

export const createUserWithEmailAndPassword = async (authObj: any, email: string, password: string): Promise<any> => {
  if (!hasFirebaseKeys) {
    console.log("Mock Firebase Auth: Registering test user", email);
    return {
      user: {
        uid: "mock-user-123",
        email: email,
        displayName: email.split("@")[0],
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      }
    };
  }
  return realSignUp(authObj, email, password);
};

export const updateProfile = async (userObj: any, profile: { displayName?: string; photoURL?: string }): Promise<any> => {
  if (!hasFirebaseKeys) {
    return Promise.resolve();
  }
  return realUpdateProfile(userObj, profile);
};

export { app, auth };
