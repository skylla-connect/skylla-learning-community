import React from 'react';
import AuthContext from './context';
import { withFirebase } from '../../App/firebase';
const withAuthentication = Component => {

    class WithAuthentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        authUser: null,
        isSettled: false,
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
        authUser
        ? this.setState({ authUser: authUser, isSettled: true })
        : this.setState({ authUser: null, isSettled: true });
        },
        );
    }
    componentWillUnmount() {
        this.listener();
    }
    render() {
        return (
        <AuthContext.Provider value={{...this.state}}>
            <Component {...this.props} />
        </AuthContext.Provider>
        );
        }
    }
    return withFirebase(WithAuthentication);
}
export default withAuthentication;
