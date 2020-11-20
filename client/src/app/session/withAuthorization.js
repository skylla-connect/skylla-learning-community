import React from 'react';
// import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from '../session/context';
import { withFirebase } from '../../App/firebase';
// import * as ROUTES from '../../app/config/routes';


const withAuthorization = condition => Component => {
class WithAuthorization extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user: null,
            Role: "trainee",
            isLoading: true,
        }
    }
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            let userId = authUser.uid;
            this.props.firebase.doGetUserAdmin(userId)
            .then(data => {
                if(data.exists) {
                    this.setState({Role: "admin"})
                    return data.data();
                }else {
                    return this.props.firebase.doGetUserTrainer(userId)
                    .then(data => {
                        if(data.exists) {
                            this.setState({Role: "trainer"})
                            return data.data(); 
                        }else {
                            return this.props.firebase.doGetUserTrainee(userId)
                            .then(data => {
                                if(data.exists) {
                                    return data.data();
                                }
                            })
                        }
                    })
                }
            }).then(data => {
                const userData = {
                    ...data,
                    ROLE: this.state.Role,
                }
                if (!condition(userData)) {
                    this.props.firebase.doSignOut();
                }
                this.setState({user: userData, isLoading: false});
            })
            .catch(error => {
                this.setState({ error, isLoading: false});
                });
        });
    } 
    componentWillUnmount() {
        this.listener();
    }  
    render() {
        return (
        <AuthUserContext.Provider value={{...this.state}}>
            <Component {...this.props} />
        </AuthUserContext.Provider>
        );
        
        }
    }
    return compose(
            // withRouter,
            withFirebase,
            )(WithAuthorization);
};
export default withAuthorization;