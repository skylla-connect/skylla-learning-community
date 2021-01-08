import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { compose } from "recompose";

import * as ROUTES from "./App/config/routes";
import Admin from './App/screens/Admin/index';
import Trainer from './App/screens/Trainer/index';
import Trainee from './App/screens/Trainee/index';
import { useUser } from './App';
import withAuthorization from './App/session/withAuthorization';
import { FullPageSpinner } from './App/components';
import LiveSupport from './LiveSupport/LiveSupport'
import LiveSupport2 from './LiveSupport2/LiveSupport2'
import  Support  from './App/screens/chat'
import { withFirebase } from './App/firebase';
import AdminChat from './App/screens/chat/admin';

const Athenticated = (props) => {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
    const {user, isLoading} = useUser();

    React.useEffect(() => {
        props.firebase.requestFirebaseNotificationPermission()
        .then((firebaseToken) => {
        // eslint-disable-next-line no-console
            console.log(firebaseToken);
            // if (user.ROLE === "admin") {
                // props.firebase.doSetTokens({'id':user.userId,'admin-access-token':firebaseToken})
            // }
        })
        .catch((err) => {
            return err;
        });
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
        <Routes authUser={user}/>
     );
} 
const condition = (authUser) => authUser;
export default compose(
    withFirebase,
    withAuthorization(condition))(Athenticated);

function Routes(props) {
    return (
        <Router>
            <Switch>
                <Route path={ROUTES.ADMIN} component={Admin} />
                <Route path={ROUTES.TRAINER} component={Trainer} />
                <Route path={ROUTES.TRAINEE} component={Trainee} />
                <Route path={ROUTES.LIVE_SUPPORT} component={LiveSupport} />
                <Route path={ROUTES.LIVE_SUPPORT2} component={LiveSupport2} />
                <Route path="/livechat/:roomId" component={Support} />
                <Route path="/livechat/:roomId/admin" component={AdminChat} />
                <Route path="/">
                    {props.authUser.ROLE === "admin" && <Redirect to={ROUTES.ADMIN}/>}
                    {props.authUser.ROLE === "trainer" && <Redirect to={ROUTES.TRAINER}/>}
                    {props.authUser.ROLE === "trainee" && <Redirect to={ROUTES.TRAINEE}/>}
                </Route>
            </Switch>
        </Router>
    )
}