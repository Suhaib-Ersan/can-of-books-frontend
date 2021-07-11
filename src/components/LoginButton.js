import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Login.css';
function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0(); // this is called destructing

  return  <button className="login" onClick={loginWithRedirect}>Log in</button>;
}

export default LoginButton;
