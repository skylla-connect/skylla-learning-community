/** @jsx jsx */
import {jsx} from '@emotion/core'

import { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../../app/firebase';
import * as ROUTES from '../../config/routes';
import { Centered, FormGroup } from '../../components';
import { Footer } from '../components/footer';
import SideBanner from '../components/sidebar';
// import * as colors from "../../styles/colors";
import TextFieldMui from '../components/textField';
import ButtonMui from '../components/button';

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
                    <div css={{
                        width: '350px',
                    }}>
                        <h6 css={{
                            fontFamily: 'Helvetica-Bold',
                            fontSize: '16px',
                        }}>Password Recovery</h6>
                        <p css={{fontSize: '15px'}}>To get a reset link enter the email 
                            address you added to your account</p>
                    </div>
                    <PasswordForgetForm />

                    <p css={{
                        fontSize: '15px',
                        padding: '30px 0 20px 0',
                        }}>
                        Click to go back
                        <span css={{paddingLeft: '18px'}}>
                            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                        </span>
                    </p>
                    
                    <Footer/>
                </div> 
            </Centered>
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
    isPending: false,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    
    onSubmit = event => {
        const { email } = this.state;
        this.setState({isPending: true});
        this.props.firebase
        .doPasswordReset(email)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
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
        const { email, error } = this.state;
        const isInvalid = email === '';
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
                placeholder="Enter your email address"
                onChange={this.onChange}
                />
            </FormGroup>
            <FormGroup css={{
                paddingTop: '25px'
            }}>
                <ButtonMui 
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isInvalid}
                    isPending={this.state.isPending}
                    text="send"
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
const PasswordForgetLink = () => (
    <p css={{fontSize: '14px'}}>
        <Link to={ROUTES.PASSWORD_RESET}>Forgot Password?</Link>
    </p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };