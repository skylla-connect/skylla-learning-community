/** @jsx jsx */
import {jsx} from '@emotion/core'

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../firebase';
import * as ROUTES from '../../config/routes';
import { Centered, FormGroup } from '../../components';
import { Footer } from '../components/footer';
import SideBanner from '../components/sidebar';
import * as colors from "../../styles/colors";

const PasswordForgetPage = () => (
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
                    <h6>Password Recovery</h6>
                    <p>To get a reset link enter the email 
                        address you added toyour account</p>
                    <PasswordForgetForm />
                    <Footer/>
                </div> 
            </Centered>
        </div>
    </div>
);
const INITIAL_STATE = {
email: '',
error: null,
};
class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { email } = this.state;
        this.props.firebase
        .doPasswordReset(email)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
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
        const { email, error } = this.state;
        const isInvalid = email === '';
        return (
            <form onSubmit={this.onSubmit}>
               <FormGroup>
                <label htmlFor="email">E-mail Address</label>
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
                    placeholder="Enter your email address"
                />
            </FormGroup>
            <button className="btn"
             css={{
                width: '65%',
                padding: '8px 10px',
                textAlign: 'center',
                borderRadius: '7px',
                marginTop: '25px',
                backgroundColor: colors.blue,
                color: colors.base,
            }}
            disabled={isInvalid} type="submit">
            SEND
            </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}
const PasswordForgetLink = () => (
<p css={{fontSize: '14px'}}>
<Link to={ROUTES.PASSWORD_RESET}>Forgot Password?</Link>
</p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };