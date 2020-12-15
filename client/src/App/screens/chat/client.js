import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-web-gifted-chat'

export const Client = (props) => {
  const [messages, setMessages] = useState([]);
  const user = firebase.auth().currentUser
  const admin = props.friend
  const dummy = React.useRef();

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  
  useEffect(() => {
    listener = props.firebase.doGetMessages(generateChatId(), 0)
    .then(snapshot => {
       // get children as an array
       var items = [];
       snap.forEach((child) => {
           var avatar = 'https://www.gravatar.com/avatar/' + ( child.uid === user.uid? md5(user.email) : md5(admin.email))
           var name = child.uid === user.uid? user.name: admin.name
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
       scrollToBottom;
    });
    () => {listener = null}
  })

  const generateChatId = () =>  {
    if(user.uid > admin.uid)
        return `${user.uid}-${admin.uid}`
    else
        return `${admin.uid}-${user.uid}`
  }

  const onSend = (messages = []) => {
    messages.forEach(message => {
        var now = new Date().getTime()
        props.firebase.doPushMessage({
            _id: now,
            text: message.text,
            createdAt: now,
            uid: user.uid,
            order: -1 * now
        })
    })
    // dummy.current.scrollIntoView({ behavior: 'smooth' }); 
}
  return (
    <div className="msg_box" style="left: 0px">
    <div className="msg_head">Live Chat</div>
    <div className="contentArea" style="display: none"></div>
    <div className="chatArea" style="display: none">
        <div className="messages">
            <div className="msg_push_old"></div>
            <div className="msg_push_new"></div>
        </div>
        <div className='typing'></div>
        <input className="inputMessage" rows="1" placeholder="Type here..."></input>
    </div>
    </div>
  )
}