import React, { Component } from 'react';
import 'firebase/firestore';
import app from 'firebase/app';
import { Centered, FormGroup } from '../../../components';
import TextFieldMui from "../../components/textField";
import ButtonMui from "../../components/button";
import './schedule.css';

const CreateModule = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left !important'
    }}>
        <div style={{
            width: '100%',
            position: 'relative',
            Height: '100vh',
           }}>
            <Centered>
                <div>
                    <h5
                    style={{
                        fontSize: '16px',
                        textTransform: 'capitalize',
                        color: '#000000',
                        paddingBottom: '30px',
                    }}>Schedule Class</h5>
                    <ModuleForm />
                </div>
            </Centered>
        </div>
    </div>
);

const INITIAL_STATE = {
    module: '',
    session: '',
    link: '',
    isPending: false,
    error: null,
};


class ModuleForm extends Component {

    constructor(props) {
        super(props);
        this.db = app.firestore();
        this.state = {
           ...INITIAL_STATE,
        }
    }

    addModule = (event) => {
        event.preventDefault();
        this.db.settings({
          timestampsInSnapshots: true
        });
        
        this.db.collection(`/users/trainer/dashboard/live_class/schedule`).add({
          module: this.state.module,
          session: this.state.session,
          link: this.state.link,
          createdAt: new Date().toISOString(),
        })
        .then(function DocId(docRef) {
            return docRef.id;
        })

        .catch(error => {
            this.setState({ error, isPending: false});
        });

        this.setState({
            ...INITIAL_STATE
        });
    };

    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    render() {
        const {
            module,
            session,
            link,
            isPending,
            error,
            } = this.state;   

            const isInvalid =
            module === '' ||
            session === '' ||
            link === '' 

        return (
            <form onSubmit={this.addModule}  style={{
                width: '600px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                }}>

                <FormGroup>
                    <TextFieldMui
                        label="Name of the module"
                        variant="outlined"
                        type="text"
                        id="name"
                        name="module"
                        value={module}
                        placeholder="Name of the Module"
                        onChange={this.updateInput}
                    />
                </FormGroup>

                <FormGroup  style={{
                    paddingTop: "18px",
                    }}>
                    <TextFieldMui
                        label="Session"
                        variant="outlined"
                        type="text"
                        id="sesn"
                        name="session"
                        value={session}
                        onChange={this.updateInput}
                    />
                </FormGroup>

                <FormGroup  style={{
                    paddingTop: "18px",
                    }}>
                    <TextFieldMui
                        label="Link"
                        variant="outlined"
                        type="text"
                        id="link"
                        name="link"
                        value={link}
                        onChange={this.updateInput}
                    />
                </FormGroup>

                <FormGroup style={{
                    paddingTop: '18px',
                    }}>
                    <ButtonMui
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isInvalid}
                    isPending={isPending}
                    text="schedule"
                    />
                </FormGroup>
                {error && <p style={{
                    paddingTop: '15px',
                    fontSize: '14px',
                    color: 'red',
                }}>{error.message}</p>}
            </form>
        );
    }
}

export default CreateModule;