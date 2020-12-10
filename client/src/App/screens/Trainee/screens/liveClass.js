import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FirebaseContext from 'firebase';
import 'firebase/firestore';
  
export default function ClassLink () {
    const [currentUserDetails, setcurrentUserDetails] = React.useState({name:'', email:'', password:'', photo: ''})
    const [liveClassDetails, setliveClassDetails] = React.useState({module:'', session:'', link:''});

    class classDetails {
      constructor (module, session, link ) {
          this.module = module;
          this.session = session;
          this.link= link;
      }
    }
    
    class userDetails {
      constructor (name, email, password, photo ) {
          this.name = name;
          this.email = email;
          this.password = password;
          this.photo= photo;
        }
      }
  
        // Firestore data converter
        var userDetailsConverter = {
          toFirestore: function(userDetails) {
          return {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            photo: userDetails.photo
          }
        },
        fromFirestore: function(snapshot, options){
            const data = snapshot.data(options);
            const det1 = new userDetails(data.name, data.email, data.password, data.photo);
            return det1
        }
    }
  
    var classDetailsConverter = {
      toFirestore: function(classDetails) {
          return {
              module: classDetails.module,
              session: classDetails.session,
              link: userDetails.link
              }
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          const det1 = new classDetails(data.module, data.session, data.link);
          return det1
      }
  }
    React.useEffect(() => {
          let user = FirebaseContext.auth().currentUser;   
          let db = FirebaseContext.firestore().collection('users/trainee/users');
          let query = db.where('userId', '==', user.uid);
          
          query.withConverter(userDetailsConverter).get()
          .then(snapshot => {
              if (snapshot.empty) {
              console.log('No matching documents.');
              return;
              }  
  
              snapshot.forEach(doc => {
                  var x = doc.data();
                  setcurrentUserDetails(x)
              // console.log(doc.id, '=>', x);
              ;
              })
          })
          .catch(err => {
              console.log('Error getting documents', err);
          });
    }, []);
  
    React.useEffect(() => {
      let db = FirebaseContext.firestore().collection('users/trainer/dashboard/live_class/schedule');
      let query = db.where('session', '==', 'evening');
      
      query.withConverter(classDetailsConverter).get()
      .then(snapshot => {
          if (snapshot.empty) {
          console.log('No matching documents.');
          return;
          }  
  
          snapshot.forEach(doc => {
              var x = doc.data();
              setliveClassDetails(x)
          // console.log(doc.id, '=>', x);
          ;
          })
      })
      .catch(err => {
          console.log('Error getting documents', err);
      });
    }, [classDetailsConverter]);


  return (
    <div style={{textAlign: 'center'}}>
      <a href={liveClassDetails.link} target="_blank" rel="noopener noreferrer">
        <MenuItem style={{color: 'white'}}>
          <img 
          src="https://cdn3.iconfinder.com/data/icons/UltimateGnome/128x128/apps/gnome-session-switch.png" 
          alt="" 
          style={{ marginRight: '10px', width: '15%'}}
          /> Join Live Class
        </MenuItem>
      </a>
    </div>
  );
}