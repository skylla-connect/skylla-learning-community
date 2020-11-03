import React from 'react'
import {FullPageSpinner} from './app/components'
import withAuthetication from "./app/session/withAuthetication";
import AuthUserContext from "./app/session/context";

const loadAuthenticatedApp = () => import('./authenticated-app')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function useUser() {
  const context = React.useContext(AuthUserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}
const App = () => {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const { isSettled, authUser } = useUser();
  console.log(isSettled);

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
