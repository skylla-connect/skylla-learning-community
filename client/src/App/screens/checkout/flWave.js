import React from 'react';
import FirebaseContext from 'firebase';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export default function App() {
  const [currentUserDetails, setcurrentUserDetails] = React.useState({name:'', email:'', password:'', photo: ''})

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

  React.useEffect(() => {
    let user1 = FirebaseContext.auth().currentUser; 
    let db = FirebaseContext.firestore().collection("users/admin/users");
    let query = db.where('uid', '==', user1.uid);

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
}, [userDetailsConverter])

  const config = {
    public_key: 'FLWPUBK-a3c73a9d3bfd2c506551da6c75bcff7a-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'UGX',
    payment_options: 'card,mobilemoneyuganda',
    customer: {
      email:  FirebaseContext.auth().currentUser.email,
    },
    customizations: {
      title: 'Module Payment',
      description: 'Payment for items in cart',
      logo: 'data:image/jpeg;base64,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',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <div
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </div>
    </div>
  );
}