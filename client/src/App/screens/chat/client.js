import React, { useState, useCallback, useEffect } from 'react'
import { withFirebase } from '../../firebase';
import { Actions, ChatUI, Composer, InputToolbar } from './component/Chat';
import Send from './component/Send';
import md5 from './lib/md5'
import uuid from "uuid";

const Client = (props) => {
  const [messages, setMessages] = useState([]);
  const user = props.user;
  const admin = props.friend

  
  useEffect(() => {
    props.firebase.doGetMessages(generateChatId(), 0)
    .then(snapshot => {
       // get children as an array
       var items = [];
       snapshot.forEach((child) => {
           var avatar = 'https://www.gravatar.com/avatar/' + (md5(user.email));
           items.push({
               _id: child.createdAt,
               text: child.text,
               createdAt: new Date(child.createdAt),
               user: {
                   _id: child.uid,
                   avatar: avatar
               }
           });
       })
       if (props.admin.length === 0 ) {
        items.push({
          _id: uuid(),
          text: "Thank you for reaching us." +
          " Please leave your message here and we will get back to you shortly.",
          createdAt: new Date(),
          system: true
      });
      }
       setMessages(items)
      //  scrollToBottom();
      // return () => listener = null;
    });
  })

  const generateChatId = () =>  {
      return user.userId;
  }

  const onSend = (messages = []) => {
    messages.forEach(message => {
        var now = new Date().getTime()
        props.firebase.doPushMessage({
            _id: now,
            text: message.text,
            createdAt: now,
            uid: user.userId,
            roomId: user.userId,
            order: -1 * now
        })
    }) 
}
// props.firebase.onBackgroundMessageHandler()
// .then(payload => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   (function(payload){
//     const notificationTitle = payload.data.title;
//     const notificationOptions = {
//       body: payload.data.roomId,
//       icon: '/firebase-logo.png'
//     };
//      return Window.registration.showNotification(notificationTitle,
//       notificationOptions);
//   })();
//   Window.addEventListener('notificationclick', event => {
//     console.log(event)
//     console.log(payload)
//     props.history.push(`/livechat/${payload.notificationOptions.roomId}`)
//     return event;
//   })
//   .then(payload => {  
//     console.log(payload)
//     });
//   }) 
props.firebase.onMessageListener()
.then((payload) => {
    console.log('Message received. ', payload);

    const noteTitle = payload.data.title;
    const noteOptions = {
      body: payload.data.roomId,
      icon: "typewriter.jpg", //this is my image in my public folder
    };

    console.log("title ", noteTitle, " ", payload.data.roomId);
    //var notification = //examples include this, seems not needed

    new Notification(noteTitle, noteOptions).onclick = function (event) {
      console.log(event);
      // console.log(payload.notification.click_action);
      // if(payload && payload.notification &&  payload.notification.click_action &&  payload.notification.click_action.length > 0)
      // {
      //   window.open(payload.notification.click_action, '_blank');
      // }
      this.close();
    }
})
.catch((err) => {
  console.log(JSON.stringify(err));
});
  return (
    <ChatUI
        user={{
          id: user.userId,
          email: user.email,
          name: user.name,
          avatar: 'https://www.gravatar.com/avatar/' + (md5(user.email)),
        }}
        messages={messages}
        onSend={messages => onSend(messages)}
      />
  )
}
export default withFirebase(Client);