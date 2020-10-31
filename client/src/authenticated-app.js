import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import * as ROUTES from "./app/config/routes";
import Home from './app/screens/home/index';



const Athenticated = () => {
    return ( 
        <Routes />
     );
} 
export default Athenticated;

function Routes() {
    return (
            <Router>
                <h1>home</h1>
                <Switch>
                    <Route path={ROUTES.HOME} component={Home} />
                    <Route path="/">
                        <Redirect to={ROUTES.HOME}/>
                    </Route>
                </Switch>
            </Router>
)
    }