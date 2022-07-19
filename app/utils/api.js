import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export function reauthenticate(password) {
  const auth = getAuth();
  const user = auth.currentUser;

  // TODO(you): prompt the user to re-provide their sign-in credentials
  const credential = EmailAuthProvider.credential(user.email, password);
  return reauthenticateWithCredential(user, credential);
}
