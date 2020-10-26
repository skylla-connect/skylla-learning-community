import React from 'react'
import {FullPageSpinner} from './app/components'
import withAuthetication from "./app/session/withAuthetication";


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
