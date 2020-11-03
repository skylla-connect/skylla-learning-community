import React from 'react'
import {FullPageSpinner} from './app/components'
import withAuthetication from "./app/session/withAuthetication";
import AuthUserContext from "./app/session/context";


const loadAuthenticatedApp = () => import('./authenticated-app')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

const App = () => {
  // pre-load the authenticated side in the background while the user's
  // filling out the login form.
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <AuthUserContext.Consumer>
        {authUser => authUser ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </AuthUserContext.Consumer>
    </React.Suspense>
  )
}

export default withAuthetication(App);
