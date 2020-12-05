import React, { Component } from 'react';
import 'firebase/firestore';
import app from 'firebase/app';
import { Centered, FormGroup } from '../../../components';
import TextFieldMui from "../../components/textField";
import ButtonMui from "../../components/button";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';;

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
                    }}>create module (s)</h5>
                    <ModuleForm />
                </div>
            </Centered>
        </div>
    </div>
);

const INITIAL_STATE = {
    module: '',
    description: '',
    content: '',
    imgUrl: null,
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

        // make a reference to our firebase storage
        // Create a root reference
        let storageRef = app.storage().ref();


        this.db.collection(`users/admin/dashboard/module/modules`).add({
          module: this.state.module,
          description: this.state.description,
          content: this.state.content,
          imgUrl: storageRef.child(`modules/${this.state.imgUrl}`),
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
            description,
            content,
            imgUrl,
            isPending,
            error,
            } = this.state;   

            const isInvalid =
            module === '' ||
            description === '' ||
            content === '' ||
            imgUrl === ''

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
                        label="Description"
                        variant="outlined"
                        type="text"
                        id="desc"
                        name="description"
                        value={description}
                        onChange={this.updateInput}
                    />
                </FormGroup>

                <FormGroup style={{
                    paddingTop: "18px"
                    }}>
                    <TextareaAutosize  
                        label="Content"
                        variant="outlined"
                        name="content"
                        value={content}
                        aria-label="minimum height" 
                        placeholder="Write the Content of this module"
                        rowsMin={10}
                        onChange={this.updateInput}

                        style={{
                            borderRadius: 5,
                        }}
                    />
                </FormGroup>

                <div style={{
                    paddingTop: "18px"
                    }}>
                    <input
                        accept="image/*"
                        value={imgUrl}
                        onChange={this.updateInput}
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                </div>

                <FormGroup style={{
                    paddingTop: '18px',
                    }}>
                    <ButtonMui
                        startIcon={<CloudUploadIcon />}
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isInvalid}
                        isPending={isPending}
                        text="create module"
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