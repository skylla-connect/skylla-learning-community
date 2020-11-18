/** @jsx jsx */
import {jsx} from '@emotion/core'

import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../signup';
import { withFirebase } from '../../../App/firebase';
import * as ROUTES from '../../config/routes';
// import * as colors from "../../styles/colors";
import { Centered, FormGroup } from '../../components';
import SideBanner from '../components/sidebar';
import { PasswordForgetLink } from '../resetPassword';
import {Footer} from "../components/footer";
import TextFieldMui from '../components/textField';
import ButtonMui from '../components/button';


const SignInPage = () => (
    <div css={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <SideBanner/>
        <div css={{
            width: '70%',
            position: 'relative',
            height: '100vh',
           }}>
            <Centered>
                <div css={{
                    marginBottom: '60px',
                }}>
                    <SignUpLink />
                    <SignInForm />
                    <div css={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: '30px',
                        alignItems: 'center',
                    }}>
                        <PasswordForgetLink />
                        <Link to="#" css={{fontSize: '14px', color: 'black'}}>
                            FAQs
                        </Link>
                    </div>
                    <Footer/>
                </div> 
            </Centered>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    isPending: false,
    error: null,
};
class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        this.setState({isPending: true})
        const { email, password } = this.state;
        this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.ADMIN);
        })
        .catch(error => {
            this.setState({ error, isPending: false });
        });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { email, password, error, isPending } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <form onSubmit={this.onSubmit} 
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    width: '350px',
                }}>
            <FormGroup>
                <TextFieldMui 
                    label="E-mail Address"
                    variant="outlined"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                />
            </FormGroup>
            <FormGroup css={{
                paddingTop: '25px',
            }}>
                <TextFieldMui 
                    label="Password"
                    id="password"
                    name="password"
                    value={password}
                    variant="outlined"
                    type="password"
                    onChange={this.onChange}
                />
            </FormGroup>
            <FormGroup css={{
                paddingTop: '25px',
                }}>
                <ButtonMui 
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isInvalid}
                    isPending={isPending}
                    text="login"
                />
            </FormGroup>
            {error && <p css={{
                color: 'red', 
                fontSize: '14px',
                paddingTop: '15px'}}>{error.message}</p>}
            </form>
        );
    }
}
const SignInForm = compose(
        withRouter,
        withFirebase,
        )(SignInFormBase);
export default SignInPage;
export { SignInForm };