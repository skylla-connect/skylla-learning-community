/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../signup';
import { withFirebase } from '../../firebase';
import * as ROUTES from '../../config/routes';
import * as colors from "../../styles/colors";
import { Centered, FormGroup, Spinner } from '../../components';
import SideBanner from '../components/sidebar';
import { PasswordForgetLink } from '../resetPassword';
import {Footer} from "../components/footer";
import TextFieldMui from '../components/textField';

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
                        marginTop: '25px',
                        alignItems: 'center',
                    }}>
                        <PasswordForgetLink />
                        <h6 css={{fontSize: '14px'}}>FAQs</h6>
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
            this.props.history.push(ROUTES.HOME);
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
        const { email, password, error } = this.state;
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
                onChange={this.onChange}
                />
            </FormGroup>
            <FormGroup css={{
                paddingTop: '25px',
            }}>
                <TextFieldMui 
                label="Password"
                variant="outlined"
                type="password"
                onChange={this.onChange}
                />
                {/* <label css={{
                     marginBottom: '-2px',
                     fontSize: '14px',
                     color: '#1A1A1A',
                }} htmlFor="password">Password</label>
                <input className='form-control'
                      css={{
                        width: '350px',
                        textAlign: 'center',
                        borderRadius: '7px',
                        color: '#B3B3B3',
                    }}
                    id="password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="password"
                /> */}
            </FormGroup>
            <button className="btn"
             css={{
                fontSize: '16px',
                textAlign: 'center',
                borderRadius: '7px',
                marginTop: '25px',
                backgroundColor: colors.blue,
                color: colors.base,
            }}
            disabled={isInvalid} type="submit">
            LOGIN {this.state.isPending ? <Spinner css={{marginLeft: 5}} /> : null}
            </button>
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