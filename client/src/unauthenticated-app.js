import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import * as ROUTES from "./app/config/routes";
import {SignUpPage} from './app/screens/signup/index';
import SignInPage from './app/screens/login/index';
import PasswordReset from './app/screens/resetPassword/index';
import Product from './app/screens/productDetails';
import Checkout from './app/screens/checkout';
import Store from "./app/session/checkout-context";
import CartApp from "./app/screens/cart";

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
                    <Route path="/cart" component={CartApp} />
                   
                    {/* <Store>
                        <Route path="/checkout/:module" component={Checkout} />
                    </Store> */}
                    <Redirect to={ROUTES.SIGN_IN} />
                </Switch>
            </Router>
)
    }