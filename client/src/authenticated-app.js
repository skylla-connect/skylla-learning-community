import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import * as ROUTES from "./App/config/routes";
import Admin from './App/screens/Admin/index';
import Trainer from './App/screens/Trainer/index';
import Trainee from './App/screens/Trainee/index';
import { useUser } from './App';
import withAuthorization from './App/session/withAuthorization';
import { FullPageSpinner } from './App/components';
import Module from './App/screens/Trainee/screens/Module/Module';
import Cart from './App/screens/Trainee/screens/cart/index';
import Payment from './App/screens/Trainee/screens/cart/complete-payment/index';
import SuccessPage from './App/screens/Trainee/screens/cart/CartSucess/index';
// import LiveClass from './App/screens/Trainee/screens/liveClass';
import LiveSupport from './LiveSupport/LiveSupport';
import QuizTests from './App/QuizTests/QuizTests'
import FinalAssess from './App/FinalAssess/FinalAssess'


const Athenticated = () => {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
    const {user, isLoading} = useUser();

    React.useLayoutEffect(() => {
        if (!isLoading) {
          setFirstAttemptFinished(true)
        }
      }, [isLoading])
    
      if (!firstAttemptFinished) {
          return <FullPageSpinner />
      }
    return ( 
        <Routes authUser={user}/>
     );
} 
const condition = (authUser) => authUser;
export default withAuthorization(condition)(Athenticated);

function Routes(props) {
    return (
        <Router>
            <Switch>
                <Route path={ROUTES.ADMIN} component={Admin} />
                <Route path={ROUTES.TRAINER} component={Trainer} />
                <Route path={ROUTES.TRAINEE} component={Trainee} />
                <Route path={ROUTES.CART} component={Cart} />
                <Route path={ROUTES.MODULES} component={Module} /> 
                <Route path={ROUTES.PAYMENT} component={Payment} />
                <Route path={ROUTES.SUCCESS_PAGE} component={SuccessPage} />
                <Route path={ROUTES.LIVE_SUPPORT} component={LiveSupport} />
                <Route path ={ROUTES.QUIZTESTS} component={QuizTests} /> 
                <Route path ={ROUTES.FINALASSESS} component={FinalAssess} />
                
                {/* <Route path={ROUTES.LIVE_CLASS} component={LiveClass} /> */}
                <Route path="/">
                    {props.authUser.ROLE === "admin" && <Redirect to={ROUTES.ADMIN}/>}
                    {props.authUser.ROLE === "trainer" && <Redirect to={ROUTES.TRAINER}/>}
                    {props.authUser.ROLE === "trainee" && <Redirect to={ROUTES.TRAINEE}/>}
                </Route> 
            </Switch>
        </Router>
    )
}
