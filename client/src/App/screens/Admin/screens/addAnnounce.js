import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FirebaseContext from 'firebase';
import { FormGroup } from '../../../components';
import TextFieldMui from "../../components/textField";
import TextField from '@material-ui/core/TextField';
import ButtonMui from "../../components/button";

const INITIAL_VALUES = {
    author : '',
    content : '',
}

const Announcements = () => {

    const [values , setValues] = React.useState(INITIAL_VALUES)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const isInvalid = values.author === '' || values.content === ''

    const submitHandler = (event) =>{
        event.preventDefault()

        FirebaseContext.firestore().collection('users/admin/dashboard/anouncement/anouncement').add({
            Author : values.author,
            Content : values.content,
            uid : FirebaseContext.auth().currentUser.uid,
            createdAt : new Date().toISOString()
        }).then(function DocId(docRef) {
            let x = docRef.id
            return docRef.id;
        })
        .catch(error => {
            setValues(error);
        })
        setValues(INITIAL_VALUES)
    }

    return (
      <Container component="main" maxWidth="xs">
       <div >
            <CssBaseline />
            <div style={{
                margin:'80px auto auto auto',
                }}>
                <h5
                    css={{
                        fontSize: '16px',
                        textTransform: 'capitalize',
                        color: '#000000',
                        paddingBottom: '30px',
                }}>Create Announcement</h5>

                <form  onSubmit={submitHandler} style={{
                    width: '100%', // Fix IE 11 issue.
                    marginTop:'50px',
                    }}>

                    <FormGroup>
                        <TextFieldMui
                            required
                            variant='outlined'
                            style={{ margin:'0 0 20px 0'}}
                            label='Author'
                            fullWidth
                            value={values.author}
                            name='author'
                            onChange={handleChange('author')}
                            autoFocus
                        />
                    </FormGroup>

                    <FormGroup css={{
                        paddingTop: "18px"
                        }}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Content"
                            fullWidth
                            autoFocus
                            style={{ margin:'18px 0 20px 0'}}
                            multiline
                            rows={4}
                            variant="outlined"
                            value={values.content}
                            name='content'
                            onChange={handleChange('content')}
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
                        text="Publish"
                        />
                    </FormGroup>
                </form>
            </div>
        </div>
      </Container>
    );
}

export default Announcements;