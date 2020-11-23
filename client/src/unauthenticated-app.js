import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import * as ROUTES from "./App/config/routes";
import {SignUpPage} from './App/screens/signup/index';
import SignInPage from './App/screens/login/index';
import PasswordReset from './App/screens/resetPassword/index';


const Unathenticated = () => {
    return ( 
        <Routes />
     );
} 
export default Unathenticated;

export const Routes = () => {
    return (
            <Router>
                <Switch>
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.PASSWORD_RESET} component={PasswordReset} />
                    <Redirect to={ROUTES.SIGN_IN} />
                </Switch>
            </Router>
)
    }