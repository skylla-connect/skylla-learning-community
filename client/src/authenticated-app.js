import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import * as ROUTES from "./App/config/routes";
import Admin from './App/screens/Admin/index';
import Trainer from './App/screens/Trainer/index';
import Trainee from './App/screens/Trainee/index';
// import Payment from './App/complete-payment/index';
import { useUser } from './App';
import withAuthorization from './App/session/withAuthorization';
import { FullPageSpinner } from './App/components';
import createAssessment from './App/create-assessment';

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
                {/* <Route path={ROUTES.PAYMENT} component={Payment} /> */}
                <Route path={ROUTES.ASSESSMENTS} component={createAssessment} />
                <Route path="/">
                    {props.authUser.ROLE === "admin" && <Redirect to={ROUTES.ADMIN}/>}
                    {props.authUser.ROLE === "trainer" && <Redirect to={ROUTES.TRAINER}/>}
                    {props.authUser.ROLE === "trainee" && <Redirect to={ROUTES.TRAINEE}/>}
                </Route>
            </Switch>
        </Router>
    )
}

