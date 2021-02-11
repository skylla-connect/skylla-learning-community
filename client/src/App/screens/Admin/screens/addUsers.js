/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/core'

import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from "../../../firebase";
import { Centered, FormGroup } from '../../../components';
import ButtonMui from "../../components/button";
import * as ROUTES from '../../../config/routes';
import TextFieldMui from "../../components/textField";


const SignUpPage = () => (
    <div css={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <div css={{
            width: '100%',
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
                    }}>create Trainer's account</h5>

                    <SignUpForm />
                </div>
            </Centered>
        </div>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    photo: '',
    passwordOne: '',
    isPending: false,
    isChecked: false,
    error: null,
    password: '',
    showPassword: true,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ...INITIAL_STATE ,
        };
    }
    
    // As an admin, I can create trainers on submit
    onSubmit = event => {
        this.setState({...this.state, isPending: true})
        const { username, email, passwordOne, photo } = this.state;
        const newUser = {
            name: username,
            email: email,
            password: passwordOne,
            photo:photo,
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
                photo: newUser.photo,
                createdAt: new Date().toISOString(),
                userId: usersid,
                role: 'trainer',
            };
            this.props.firebase.doCreateNewTrainer(userCredentials);
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.ADMIN);
        })
        .catch(error => {
            this.setState({ error, isPending: false});
            });
            event.preventDefault();
        };
    onChange = event => {
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    };

    handleClickShowPassword = () => {
        const PWD = this.state.showPassword
        this.setState({
            showPassword: !PWD
        })
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };


    render() {
        const {
            username,
            email,
            passwordOne,
            isPending,
            error,
            } = this.state;    
            const isInvalid =
            passwordOne === '' ||
            email === '' ||
            username === ''

    return (
        <form onSubmit={this.onSubmit}  css={{
            width: '550px',
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
                    label="Temporary Password"
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

const SignUpForm = compose(
    withRouter,
    withFirebase,
    )(SignUpFormBase);
    

export { SignUpPage };
