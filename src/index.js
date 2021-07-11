import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

// TODO: wrap everything in Auth0
ReactDOM.render(
  <Auth0Provider domain="dev-06vxhy0j.eu.auth0.com" clientId="9z82NljjEdOfDiFElfaSJrM6OUGQHU5v" redirectUri={window.location.origin}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
