import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import * as ROUTES from "./App/config/routes";
import {SignUpPage} from './App/screens/signup/index';
import SignInPage from './App/screens/login/index';
import PasswordReset from './App/screens/resetPassword/index';
import Product from './App/screens/productDetails';
import Checkout from './App/screens/checkout';
import Store from "./App/session/checkout-context";
import CartApp from "./App/screens/cart";

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