import React, { useState } from 'react'
import {FullPageSpinner} from './app/components'
import withAuthetication from "./app/session/withAuthetication";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from "./app/config/routes";
import {SignUpPage} from './app/screens/signup/index';
import './app/bootstrap';

const loadAuthenticatedApp = () => import('./authenticated-app')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

export const Navigation = ({authUser}) => {
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
    {authUser ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}
const App = () => {
  // pre-load the authenticated side in the background while the user's
  // filling out the login form.
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])
  return (
       <Navigation />   
  )
}

export default withAuthetication(App);
