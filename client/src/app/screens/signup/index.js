/** @jsx jsx */
import {jsx} from '@emotion/core'

import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from "../../../App/firebase";

import * as ROUTES from '../../config/routes';
import SideBanner from '../components/sidebar';
import { Centered, FormGroup } from '../../components';
import './index.css';
import { Footer } from '../components/footer';
import ButtonMui from "../components/button";
import TextFieldMui from "../components/textField";


const SignUpPage = () => (
    <div css={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <SideBanner/>
        <div css={{
            width: '70%',
            position: 'relative',
            Height: '100vh',
           }}>
            <Centered>
                <div css={{marginBottom: '60px'}}>
                    <h5
                    css={{
                        fontSize: '16px',
                        textTransform: 'capitalize',
                        color: '#000000',
                        paddingBottom: '30px',
                    }}>create account</h5>
                    <SignUpForm />

                    <p css={{
                        fontSize: '16px',
                        padding: '20px 0 20px 0',
                        }}>
                        Already have an account? <span css={{paddingLeft: '18px'}}>
                        <Link to={ROUTES.SIGN_IN}>Sign In</Link></span>
                    </p>
                    <Footer/>
                </div>
            </Centered>
        </div>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isPending: false,
    isChecked: false,
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        this.setState({...this.state, isPending: true})
        const { username, email, passwordOne } = this.state;
        const newUser = {
            name: username,
            email: email,
            password: passwordOne,
        };
        let usersid;
        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then( (authUser) => {
            usersid = authUser.user.uid;
            return authUser.user.getIdToken();
        }).then(token => {
            const userCredentials = {
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                createdAt: new Date().toISOString(),
                userId: usersid,
                role: 'trainee',
            };
            this.props.firebase.doCreateNewUser(userCredentials);
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.ADMIN);
        })
        .catch(error => {
            this.setState({ error, isPending: false});
            });
            event.preventDefault();
        };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isPending,
            error,
            isChecked,
            } = this.state;
            const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            isChecked === false ||
            isPending;

    return (
        <form onSubmit={this.onSubmit}
        css={{
            width: '350px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        }}>
             <FormGroup>
            <TextFieldMui
                label="Full Name"
                variant="outlined"
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Name"
                onChange={this.onChange}
                />
            </FormGroup>
             <FormGroup css={{
                 paddingTop: "18px"
             }}>
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
                paddingTop: '18px',
            }}>
                <TextFieldMui
                label="Password"
                id="passwordOne"
                name="passwordOne"
                value={passwordOne}
                variant="outlined"
                type="password"
                onChange={this.onChange}
                />
            </FormGroup>
             <FormGroup css={{
                paddingTop: '18px',
            }}>
                <TextFieldMui
                label="Confirm Password"
                id="passwordTwo"
                name="passwordTwo"
                value={passwordTwo}
                variant="outlined"
                type="password"
                onChange={this.onChange}
                />
            </FormGroup>
            <FormGroup css={{display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: '8px',
        }}>
                <input css={{
                   marginLeft: '0'
                }} id="terms" type='checkbox'
                checked={isChecked}
                onChange={() => this.setState({isChecked: !isChecked})}/>
                <label htmlFor="terms"
                css={{
                    marginTop: '8px',
                    padding: '10px',
                    fontSize: '14px'
                }}>I agree to <Link to="#" css={{
                    // backgroundColor: "#007bff",
                    color: "#007bff" }}>Terms</Link> of service and to Skylla <Link to="#"
                    css={{
                        // backgroundColor: "#007bff",
                        color: "#007bff"
                    }}>Polices</Link> </label>
            </FormGroup>
            <FormGroup css={{
                paddingTop: '15px',
            }}>
                <ButtonMui
                variant="contained"
                color="primary"
                type="submit"
                disabled={isInvalid}
                isPending={isPending}
                text="create account"
                />
            </FormGroup>
            {error && <p css={{
                paddingTop: '15px',
                fontSize: '14px',
                color: 'red',
            }}>{error.message}</p>}
        </form>
    );
    }
}

const SignUpLink = () => (
<p css={{
    fontSize: '16px',
    paddingBottom: '30px',
    }}>
    Don't have an account? <span css={{paddingLeft: '10px'}}>
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link></span>
</p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
    )(SignUpFormBase);


export { SignUpPage, SignUpLink };
