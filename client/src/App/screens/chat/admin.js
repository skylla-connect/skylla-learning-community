import React, { useState, useCallback, useEffect } from 'react'
import { withFirebase } from '../../firebase';
import { ChatUI } from './component/Chat';
import md5 from 'md5';
import { Notifications } from "react-push-notification";

const Admin = (props) => {
  const [messages, setMessages] = useState([]);
  const user = props.firebase.auth.currentUser
  const admin = props.friend
  // const dummy = React.useRef();
  // console.log(user);
  // const scrollToBottom = () => {
  //   dummy.current.scrollIntoView({ behavior: 'smooth' });
  // }
  
  useEffect(() => {
    props.firebase.doGetMessages(generateChatId(), 0)
    .then(snapshot => {
       // get children as an array
       console.log(snapshot);
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
       setMessages(items)
      //  scrollToBottom();
      // return () => listener = null;
    });
  })

  const generateChatId = () =>  {
      return user.uid;
  }
  const renderAdmins = () => {
      return (  
      <div class="usersOnline">
            <h1>Admins Online</h1>
            <ul class ="adminList" id="admins">  
                {props.admins.map(admin => {
                    return <li key={admin.name}>{admin.name}</li>
                })}                  
            </ul>
  </div>)
  }

  const onSend = (messages = []) => {
    messages.forEach(message => {
        var now = new Date().getTime()
        props.firebase.doPushMessage({
            _id: now,
            text: message.text,
            createdAt: now,
            uid: user.uid,
            roomId: user.uid,
            order: -1 * now
        })
    })
    // dummy.current.scrollIntoView({ behavior: 'smooth' }); 
}
    console.log(user);
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
        props.firebase.onBackgroundMessageHandler()
        .then(payload => {
          console.log('[firebase-messaging-sw.js] Received background message ', payload);
          (function(payload){
            const notificationTitle = payload.data.title;
            const notificationOptions = {
              body: payload.data.roomId,
              icon: '/firebase-logo.png'
            };
             return Window.registration.showNotification(notificationTitle,
              notificationOptions);
          })();
          Window.addEventListener('notificationclick', event => {
            console.log(event)
            console.log(payload)
            props.history.push(`/livechat/${payload.notificationOptions.roomId}`)
            return event;
          })
          .then(payload => {  
            console.log(payload)
            });
          }) 
  return (
      <div>
        <Notifications />
        {renderAdmins()}
        <ChatUI
        user={{
          id: user.uid,
          email: user.email,
          name: props.user.name,
          avatar: 'https://www.gravatar.com/avatar/' + (md5(user.email)),
        }}
        messages={messages}
        onSend={messages => onSend(messages)}
      />
      </div>
  )
}
export default withFirebase(Admin);