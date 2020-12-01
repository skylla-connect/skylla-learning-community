import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import * as ROUTES from "./app/config/routes";
import Admin from './app/screens/Admin/index';
import Trainer from './app/screens/Trainer/index';
import Trainee from './app/screens/Trainee/index';
import { useUser } from './App';
import withAuthorization from './app/session/withAuthorization';
import { FullPageSpinner } from './app/components';
import LiveSupport from './LiveSupport/LiveSupport'
import LiveSupport2 from './LiveSupport2/LiveSupport2'

const Athenticated = () => {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
    const {user, isLoading} = useUser();

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
export default withAuthorization(condition)(Athenticated);

function Routes(props) {
    return (
        <Router>
            <Switch>
                <Route path={ROUTES.ADMIN} component={Admin} />
                <Route path={ROUTES.TRAINER} component={Trainer} />
                <Route path={ROUTES.TRAINEE} component={Trainee} />
                <Route path={ROUTES.LIVE_SUPPORT} component={LiveSupport} />
                <Route path={ROUTES.LIVE_SUPPORT2} component={LiveSupport2} />
                <Route path="/">
                    {props.authUser.ROLE === "admin" && <Redirect to={ROUTES.ADMIN}/>}
                    {props.authUser.ROLE === "trainer" && <Redirect to={ROUTES.TRAINER}/>}
                    {props.authUser.ROLE === "trainee" && <Redirect to={ROUTES.TRAINEE}/>}
                </Route>
            </Switch>
        </Router>
    )
}