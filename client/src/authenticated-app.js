/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import * as ROUTES from "./app/config/routes";
import Admin from './app/screens/Admin/index';
import Trainer from './app/screens/Trainer/index';
import Trainee from './app/screens/Trainee/index';
import { useUser } from './App';
import withAuthorization from './app/session/withAuthorization';
import { FullPageSpinner } from './app/components';
import Product from './app/screens/productDetails';

function NetworkError() {
    return (
      <div
        css={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <p css={{
              fontSize: '18px',
          }}>Sorry... something went wrong try refeshing the your browser, 
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
                <Route path="/product" component={Product} />
                <Route path="/">
                    {props.authUser.ROLE === "admin" && <Redirect to={ROUTES.ADMIN}/>}
                    {props.authUser.ROLE === "trainer" && <Redirect to={ROUTES.TRAINER}/>}
                    {props.authUser.ROLE === "trainee" && <Redirect to={ROUTES.TRAINEE}/>}
                </Route>
            </Switch>
        </Router>
    )
}