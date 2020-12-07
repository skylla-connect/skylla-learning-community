import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import 'firebase/firestore'
import app from 'firebase/app'
import { withFirebase } from '../firebase';
import './assement.css'
import Footer from '../components/Footer/footer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign:'center'
  },
}));

const CreateAssessment = () => {
    const classes = useStyles();
    return(
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        SKYLLA LEARNING COMMUNITY
                    </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        <Link to='/'>
          <ArrowBack 
              style={{
                  color: 'blue', 
                  float: 'left', 
                  border: '1px solid black',
                  margin: '30px',
                  fontSize:'40px'
              }} />
        </Link>
            <CreateAssessmentForm />
        </div>
    )
}

const INITIAL_STATE ={
    tittle:'',
    description:'',
    content:'',
    username:'',
    user:null,
    error:''
}
class CreateAssessmentForm extends Component {
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

    createAssessment = (event) =>{
        event.preventDefault()
        this.db.settings({
            timestampsInSnapshots : true
        })
        this.db.collection(`users/admin/dashboard/assessment/assessments`).add({
            user: this.Authuser.email,
            uid: this.Authuser.uid,
            username: this.state.username,
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
            error
        } = this.state

        const isInvalid =
            tittle === '' ||
            description === '' ||
            content === ''

            
    return (
      <Container component="main" style={{width:'65%'}} className='contain-assess'>
       <div >
    < CssBaseline />
    <form onSubmit={this.createAssessment}  className='form2'>
            <div style={{display:'flex'}}>
            <TextField
                label='username' 
                name='username'
                variant='outlined'
                value={this.state.username}
                onChange={this.onChange}
                style={{margin:'20px 0 0 0',width:'100%'}}
            />
                <br  />
                <TextField 
                    label='Tittle Question '
                    name='tittle'
                    value={tittle}
                    variant='outlined'
                    onChange={this.onChange}
                    style={{margin:'20px 0 0 10px',width:'100%'}}
                />
                </div>
                 <br />
                <TextField
                    label='Hint'
                    name='description'
                    variant='outlined'
                    value={description}
                    onChange={this.onChange}
                    style={{margin:'20px 0 0 0',width:'100%'}}
                />
                <br />

                <TextareaAutosize
                    label="Content"
                    variant="outlined"
                    name="content"
                    value={content}
                    aria-label="minimum height" 
                    placeholder="Ask the Content of the Assement"
                    rowsMin={10}
                    onChange={this.onChange}
                    style={{margin:'20px 0 0 0',width:'100%'}}
                />

                <br />
                <Button 
                    type='submit' 
                    disabled={isInvalid}
                    variant='contained'
                    color='secondary'
                    style={{margin:'20px 0 0 0',width:'100%'}}
                    >
                    Create
                </Button>
                {error && <p style={{
                    paddingTop: '15px',
                    fontSize: '14px',
                    color: 'red',
                }}>{error.message}</p>}
      </form>

     <div style={{margin:'30px 0 0 0 '}}>
     <Footer />
     </div>
      </div>
      </Container>
    );
  }
}
export default withFirebase(CreateAssessment)
