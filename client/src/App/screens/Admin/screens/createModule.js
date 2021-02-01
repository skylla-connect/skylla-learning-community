import React from 'react';
import 'firebase/firestore';
import app from 'firebase/app';
import { Centered, FormGroup } from '../../../components';
import TextFieldMui from "../../components/textField";
import ButtonMui from "../../components/button";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FirebaseContext from 'firebase'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

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
            marginTop: 40
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

// const allInputs = {imgUrl: ''}

const INITIAL_STATE = {
    module: '',
    description: '',
    trainer: '',
    content: '',
    isPending: false,
    error: null,
};

// const AuthUser = app.auth().currentUser

const ModuleForm = () => {
    const [values , setValues] = React.useState(INITIAL_STATE)
    const [imageAsFile, setImageAsFile] = React.useState('')
    const [imageAsUrl, setImageAsUrl] = React.useState({imgUrl: ''})
    const classes = useStyles();

    const handleImageAsFile = (e) => {
        setImageAsFile(e.target.files[0]);
    } 

    const addModule = (event) => {
        event.preventDefault();

        app.firestore().settings({
            timestampsInSnapshots: true
          });

        let storageRef  =  FirebaseContext.storage().ref()
        console.log('start of upload')
        if(imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }
        const uploadTask = storageRef.child(`/modules/${imageAsFile.name}`).put(imageAsFile)
        uploadTask.on('state_changed', 
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
        }, () => {
            FirebaseContext.storage().ref('modules').child(imageAsFile.name).getDownloadURL()
            .then(fireBaseUrl => {
                FirebaseContext.firestore().collection(`modules`).add({
                    description: values.description,
                    content: values.content,
                    imageUrl : fireBaseUrl ,
                    module: values.module,
                    trainer: values.trainer,
                    user: app.auth().currentUser.email,
                    uid: app.auth().currentUser.uid,
                    modId: '',
                   createdAt: new Date().toISOString(),
                }).then(setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl})))
                .then(function DocId(docRef) {
                    let x = docRef.id
                    FirebaseContext.firestore().collection(`modules`).doc(x).update({
                       modId: docRef.id,
                    });
                    return docRef.id;
                })
        
                .catch(error => {
                    setValues(error, values.isPending = false);
                });
                setImageAsFile(imageAsFile)
                setValues(INITIAL_STATE);
            }) 
        })
    };
    const isInvalid =
        values.module === '' ||
        values.description === '' ||
        values.trainer === '' ||
        values.content === ''

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

        return (
            <div className={classes.root}>
                <form onSubmit={addModule}  style={{
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
                        value={values.module}
                        placeholder="Name of the Module"
                        onChange={handleChange('module')}
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
                        value={values.description}
                        onChange={handleChange('description')}
                    />
                </FormGroup>

                <FormGroup  style={{
                    paddingTop: "18px",
                    }}>
                    <TextFieldMui
                        label="Trainer's Name"
                        variant="outlined"
                        type="text"
                        id="trainer"
                        name="trainer"
                        value={values.trainer}
                        onChange={handleChange('trainer')}
                    />
                </FormGroup>

                <FormGroup style={{
                    paddingTop: "18px"
                    }}>
                    <TextareaAutosize  
                        label="Content"
                        variant="outlined"
                        name="content"
                        value={values.content}
                        aria-label="minimum height" 
                        placeholder="Write the Content of this module"
                        rowsMin={10}
                        onChange={handleChange('content')}

                        style={{
                            borderRadius: 5,
                        }}
                    />
                </FormGroup>
                <FormGroup style={{
                    paddingTop: "18px"
                    }}>
                    <label>
                        Attach an Image of the Module
                    </label>
                   <input
                        accept="image/*"
                        onChange={handleImageAsFile}
                        type="file"
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
                    isPending={values.isPending}
                    text="create module"
                    />
                </FormGroup>
                 {values.error && <p style={{
                    paddingTop: '15px',
                    fontSize: '14px',
                    color: 'red',
                }}>{values.error.message}</p>}
            </form>
            </div>
        );
}

export default CreateModule;