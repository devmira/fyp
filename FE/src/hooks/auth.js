import * as React from "react";
import TokenService from "../utils/token.service"

const authContext = React.createContext();

function useAuth() {
  const token = TokenService.getLocalAccessToken() ? true : false;
  const [authed, setAuthed] = React.useState(token);

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        TokenService.removeUser();
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
