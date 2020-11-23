import React from 'react';
import {FullPageSpinner} from './App/components';
import {  } from "recompose";
import withAuthetication from "./App/session/withAuthetication";
import AuthUserContext from "./App/session/context";

const loadAuthenticatedApp = () => import('./authenticated-app')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

export function useUser() {
  const context = React.useContext(AuthUserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}
const App = () => {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const { isSettled, authUser } = useUser();

  const user = authUser;

  // pre-load the authenticated side in the background while the user's
  // filling out the login form.
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])
  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true)
    }
  }, [isSettled])

  if (!firstAttemptFinished) {
      return <FullPageSpinner />
  }
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default withAuthetication(App);
