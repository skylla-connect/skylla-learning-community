import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import Container from './App/index';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './App/firebase';
import './App/bootstrap';
import { registerServiceWorker } from './register-sw'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your App to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();

registerServiceWorker();
