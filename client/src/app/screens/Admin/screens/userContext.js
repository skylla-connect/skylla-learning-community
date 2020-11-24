import React, {useState, useEffect} from 'react';
import * as Firebase from 'firebase';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrenttUSer] = useState();

      useEffect(() => {
          Firebase.auth().onAuthStateChanged((user) => {
              setCurrenttUSer(user);
              console.log(user)
          });
      }, []);

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
}