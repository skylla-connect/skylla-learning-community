import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from '../session/context';
import { withFirebase } from '../firebase';
import * as ROUTES from '../../app/config/routes';


const withAuthorization = () => Component => {
class WithAuthorization extends React.Component {
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
        this.props.history.push(ROUTES.SIGN_IN);
        }
        });
    } 
    componentWillUnmount() {
        this.listener();
        }  
    render() {
        return (
        <AuthUserContext.Consumer>
            {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
            }
        </AuthUserContext.Consumer>);
        
        }
    }
    return compose(
            withRouter,
            withFirebase,
            )(WithAuthorization);
};
export default withAuthorization;