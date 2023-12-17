import { createContext } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  userId: null,
  token: null,
  signIn: () => {},
  signOut: () => {},
});
