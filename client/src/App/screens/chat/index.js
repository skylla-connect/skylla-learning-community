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
    React.useEffect(() => {
        props.firebase.doGetAdmins()
        .then(snapshot => {
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