/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/core'

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
import SuccessPage from './App/screens/cart/components/CartSucess/index';
import Chat from './App/screens/LiveSupport/LiveSupport2/index';
import LiveSupport from './App/screens/LiveSupport/index';
import CartApp  from './App/screens/cart';
import Hired from './App/screens/Admin/screens/deleteHiredData';
import deleteUsers from './App/screens/Admin/screens/activeUsers';
import ManageEnrolledTrainees from './App/screens/Admin/screens/enrolled'
import numTrainers from './App/screens/Admin/screens/numTrainers';
import TotalModules from './App/screens/Admin/screens/totalModules';
import liveClass from './App/screens/Admin/screens/liveClass';
import Announcement from './App/screens/Trainee/components/views/announcements';
import Submissions from './App/screens/Trainer/screens/quiz/submissions';
import Challenges from './App/screens/Trainer/screens/quiz/challenges';
import Problems from './App/screens/Trainer/screens/quiz/problems';


function NetworkError() {
    return (
      <div
        css={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <div>
          <p css={{
              fontSize: '18px',
              textAlign: 'center',
          }}>Sorry... something went wrong try refeshing your browser, 
              normally this happens due to bad internet connection.</p>
        </div>
      </div>
    )
  }
  
  export {NetworkError}

const Athenticated = () => {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
    const {user, error, isLoading} = useUser();

    React.useLayoutEffect(() => {
        if (!isLoading) {
          setFirstAttemptFinished(true)
        }
      }, [isLoading])
    
      if (!firstAttemptFinished) {
          return <FullPageSpinner />
      }
      if (error) {
          return (
              <NetworkError/>
          );
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
                <Route path={ROUTES.SUCCESS_PAGE} component={SuccessPage} />
                <Route path={ROUTES.LIVE_SUPPORT} component={LiveSupport} />
                <Route path={ROUTES.CHAT} component={Chat} />
                <Route path={ROUTES.HIRED} component={Hired} />
                <Route path={ROUTES.ACTIVE_USERS} component={deleteUsers} />
                <Route path={ROUTES.N_TRAINERS} component={numTrainers} />
                <Route path={ROUTES.ENROLLED} component={ManageEnrolledTrainees} />
                <Route path={ROUTES.T_MODULES} component={TotalModules} />
                <Route path={ROUTES.Live_CLASSES} component={liveClass} />
                <Route path={ROUTES.ANNOUNCEMENTS} component={Announcement} />
                <Route path={ROUTES.CHALLENGES} component={Challenges} />
                <Route path={ROUTES.PROBLEMS} component={Problems} />
                <Route path={ROUTES.SUBMISSIONS} component ={Submissions} />
                <Route path={ROUTES.CART} component={CartApp} />

                <Route path="/">
                    {props.authUser.ROLE === "admin" && <Redirect to={ROUTES.ADMIN}/>}
                    {props.authUser.ROLE === "trainer" && <Redirect to={ROUTES.TRAINER}/>}
                    {props.authUser.ROLE === "trainee" && <Redirect to={ROUTES.TRAINEE}/>}
                </Route>
            </Switch>
        </Router>
    )
}

