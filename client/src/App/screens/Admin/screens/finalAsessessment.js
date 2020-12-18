import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import 'firebase/firestore'
import app from 'firebase/app'
import { withFirebase } from '../../../firebase';
// import './assement.css'
import { FormGroup } from '../../../components';
import TextFieldMui from "../../components/textField";
import ButtonMui from "../../components/button";

// const finalAssessment = () => {
//     return(
//         <div>
//             <FinalAssessmentForm />
//         </div>
//     )
// }

const INITIAL_STATE ={
    tittle:'',
    description:'',
    content:'',
    modulename:'',
    user:null,
    error:''
}
class FinalAssessmentForm extends Component {
    useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(0),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(10),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
          

    constructor (props){
        super(props)
        this.state={
            ...INITIAL_STATE,
        }
        this.db = app.firestore();
        this.Authuser = app.auth().currentUser;
    }

    finalAssessment = (event) =>{
        event.preventDefault()
        this.db.settings({
            timestampsInSnapshots : true
        })
        this.db.collection(`users/admin/dashboard/finalassessment/finalassessment`).add({
            user: this.Authuser.email,
            uid: this.Authuser.uid,
            modulename: this.state.modulename,
            tittle:this.state.tittle,
            description:this.state.description,
            content:this.state.content,
            createdAt: new Date().toISOString(),
        })
        .then(function DocId(docRef){
            return docRef.id
        })
        .catch(error => {
            this.setState({error})
        })
        this.setState({
            ...INITIAL_STATE
        })
        
    }
    onChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    render() {
        const {
            tittle,
            description,
            content,
            modulename,
            error
        } = this.state

        const isInvalid =
            tittle === '' ||
            description === '' ||
            content === '' ||
            modulename === ''

            
    return (
        <Container component="main" style={{width:'65%'}} className='contain-assess'>
            <div >
                <CssBaseline />
               

                <form onSubmit={this.finalAssessment}  className='form2'>
                        <div>
                            <h5
                            style={{
                                fontSize: '16px',
                                textTransform: 'capitalize',
                                color: '#000000',
                                paddingBottom: '30px',
                            }}>
                                Final Assessment
                            </h5>
                        </div>

                    <FormGroup style={{
                        paddingTop: "18px"
                        }}>
                        <TextFieldMui
                            label="Module Name"
                            variant="outlined"
                            type="text"
                            id="name"
                            name="modulename"
                            value={modulename}
                            onChange={this.onChange}
                            placeholder="Enter moduleName "
                        />
                    </FormGroup>

                    <FormGroup style={{
                        paddingTop: "18px"
                        }}>
                        <TextFieldMui
                            label="Tittle of the Question"
                            variant="outlined"
                            type="text"
                            id="tittle"
                            name="tittle"
                            value={tittle}
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <FormGroup style={{
                        paddingTop: "18px"
                        }}>
                        <TextFieldMui
                             label='Hint'
                            variant="outlined"
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={this.onChange}
                        />
                    </FormGroup>

                    <TextareaAutosize
                        label="Content"
                        variant="outlined"
                        name="content"
                        value={content}
                        aria-label="minimum height" 
                        placeholder="Ask the Content of the Assessment"
                        rowsMin={10}
                        onChange={this.onChange}
                        style={{margin:'20px auto',width:'100%'}}
                    />

                    <FormGroup style={{
                        paddingTop: '18px',
                        }}>
                        <ButtonMui
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isInvalid}
                        // isPending={isPending}
                        text="create finalAssessment"
                        />
                    </FormGroup>

                    {error && <p style={{
                        paddingTop: '15px',
                        fontSize: '14px',
                        color: 'red',
                    }}>{error.message}</p>}
                </form>
            </div>
        </Container>
    );
  } 
  
}
export default withFirebase(FinalAssessmentForm)