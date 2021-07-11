import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";

function LoginButton() {
  const { isAuthenticated, logout } = useAuth0(); // this is called destructing

  return (
    isAuthenticated && (
      <button className="logout"
        onClick={() => {
          logout({ returnTo: window.location.origin });
        }}
      >
        Log out
      </button>
    )
  );
}

export default LoginButton;
