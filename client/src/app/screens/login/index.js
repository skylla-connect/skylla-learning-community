/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../signup';
import { withFirebase } from '../../firebase';
import * as ROUTES from '../../config/routes';
import * as colors from "../../styles/colors";
import { Centered, FormGroup } from '../../components';
import SideBanner from '../components/sidebar';
import { PasswordForgetLink } from '../resetPassword';
import {Footer} from "../components/footer";

const SignInPage = () => (
    <div css={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <SideBanner/>
        <div css={{
            width: '70%',
            height: '100vh',
           }}>
            <Centered>
                <div css={{

                }}>
                    <SignUpLink />
                    <SignInForm />
                    <div css={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: '15px',
                    }}>
                        <PasswordForgetLink />
                        <h6>FAQs</h6>
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
error: null,
};
class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({ error });
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
                // backgroundColor: 'red'
            }}>
            <FormGroup>
                <label htmlFor="email">Email Address</label>
                <input className='form-control'
                      css={{
                        width: '320px',
                        padding: '5px 10px',
                        textAlign: 'center',
                        borderRadius: '7px'
                    }}
                    id="email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    placeholder="Email"
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="password">Password</label>
                <input className='form-control'
                      css={{
                        width: '320px',
                        padding: '5px 10px',
                        textAlign: 'center',
                        borderRadius: '7px'
                    }}
                    id="password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
            </FormGroup>
            <button className="btn"
             css={{
                padding: '8px 10px',
                textAlign: 'center',
                borderRadius: '7px',
                marginTop: '25px',
                backgroundColor: colors.blue,
                color: colors.base,
            }}
            disabled={isInvalid} type="submit">
            LOGIN
            </button>
            {error && <p>{error.message}</p>}
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