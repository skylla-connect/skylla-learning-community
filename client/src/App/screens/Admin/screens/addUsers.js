/** @jsx jsx */
import {jsx} from '@emotion/core'

import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from "../../../firebase";
import { Centered, FormGroup } from '../../../components';
// import './index.css';
import ButtonMui from "../../components/button";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


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
            };
            this.props.firebase.doCreateNewTrainer(userCredentials);
            this.setState({ ...INITIAL_STATE });
            this.props.history.push('/admin');
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
        <form onSubmit={this.onSubmit}>
            <FormGroup>
                <TextField
                    required
                    label="Full Name"
                    id="outlined-size-normal"
                    variant="outlined"
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    style={{minWidth: '550px'}}
                />
            </FormGroup>

             <FormGroup css={{
                 paddingTop: "18px",
                 marginBottom: '18px'
             }}>

            <TextField
                required
                label="E-mail Address"
                id="outlined-size-normal"
                variant="outlined"
                value={email}
                name='email'
                style={{    width: '100%'}}
                onChange={this.onChange}
            />
  
            </FormGroup>

            <FormGroup>
                <FormControl variant="outlined" css={{
                    paddingTop: '18px',
                }}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        required
                        label="Password"
                        id="passwordOne"
                        name="passwordOne"
                        value={passwordOne}
                        variant="outlined"
                        onChange={this.onChange}
                        type={this.state.showPassword ? 'text' : 'password'}
                        autoComplete="current-password"

                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                                edge="end"
                            >
                                {
                                this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
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

const SignUpForm = compose(
    withRouter,
    withFirebase,
    )(SignUpFormBase);
    

export { SignUpPage };
