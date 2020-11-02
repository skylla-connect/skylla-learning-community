import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import * as ROUTES from "./app/config/routes";
import Admin from './app/screens/Admin/index';
import Trainer from './app/screens/Trainer/index';
import Trainee from './app/screens/Trainee/index';

const Athenticated = () => {
    return ( 
        <Routes />
     );
} 
export default Athenticated;

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path={ROUTES.ADMIN} component={Admin} />
                <Route path={ROUTES.TRAINER} component={Trainer} />
                <Route path={ROUTES.TRAINEE} component={Trainee} />
                <Route path="/">
                    <Redirect to={ROUTES.ADMIN}/>
                </Route>
            </Switch>
        </Router>
    )
}