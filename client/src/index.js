import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import Container from './App/index';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './app/firebase';
import './app/bootstrap';
// import { UserProvider } from './app/screens/Admin/screens/userContext';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    {/* <UserProvider> */}
      <App />
    {/* </UserProvider> */}
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
