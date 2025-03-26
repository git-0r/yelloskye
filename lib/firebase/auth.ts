import {
  //   GoogleAuthProvider,
  //   signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "./clientApp";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

// export async function signInWithGoogle() {
//   const provider = new GoogleAuthProvider();

//   try {
//     await signInWithPopup(auth, provider);
//   } catch (error) {
//     console.error("Error signing in with Google", error);
//   }
// }

export async function signUp(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

export async function signIn(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

export async function signOut() {
  return auth.signOut();
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}
