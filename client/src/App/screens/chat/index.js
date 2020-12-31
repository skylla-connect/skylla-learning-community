import React from 'react';
import { withFirebase } from '../../firebase';
import { compose } from "recompose";
import withAuthorization from '../../session/withAuthorization';
import { Router } from "@reach/router";
import Admin from "./admin";
import Client from "./client";
import { useUser } from '../../../App';
import { FullPageSpinner } from '../../components';

const Support = (props) => {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
    const {user, isLoading} = useUser();
    let adminList = []
    let tokenList = []
    React.useEffect(() => {
        props.firebase.onMessageListener()
        .then((payload) => {console.log('Message received. ', payload);
    
        // const noteTitle = payload.data.title || 'room';
        // const noteOptions = {
        //   body: payload.data.roomId || 'roomid',
        //   // icon: "typewriter.jpg", //this is my image in my public folder
        // };
    
        // console.log("title ", noteTitle, " ", payload.data.roomId);
        // //var notification = //examples include this, seems not needed
    
        // new Notification(noteTitle, noteOptions).onclick = function (event) {
        //   console.log(event);
        //   // console.log(payload.notification.click_action);
        //   // if(payload && payload.notification &&  payload.notification.click_action &&  payload.notification.click_action.length > 0)
        //   // {
        //   //   window.open(payload.notification.click_action, '_blank');
        //   // }
        //   this.close();
        // }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    });
})
    React.useEffect(() => {
        props.firebase.doGetAdmins()
        .then(snapshot => {
            console.log(snapshot);
            snapshot.docs.map(doc => adminList.push(doc.data()))
        })
    })
    React.useLayoutEffect(() => {
        if (!isLoading) {
          setFirstAttemptFinished(true)
        }
      }, [isLoading])
    
      if (!firstAttemptFinished) {
          return <FullPageSpinner />
      }
    return (
        <Routes path={`/livechat/${user.userId}`} authUser={user} admins={adminList} />
    );
}

const condition = (authUser) => authUser;
export default compose(
    withFirebase,
    withAuthorization(condition)
)(Support);
function Routes(props) {
    return (
        <Router>
                {props.authUser.ROLE === "admin" && 
                <Admin path={props.path} component={Admin} user={props.authUser} />}
                {props.authUser.ROLE === "trainee" && 
                <Client path={props.path}  user={props.authUser} admin={props.admins} />}
        </Router>
    )
}