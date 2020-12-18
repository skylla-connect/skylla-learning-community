import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import app from 'firebase/app';
import { Checkbox } from '@material-ui/core';

const INITIAL_STATE = {
 tittle : '',
 time : '',
 place : '',

};

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Interviews = () =>{ 
    const classes = useStyles();

    const [users , setUsers] = React.useState([])

    const [state, setState] = React.useState({
      interviewes: '',
      name: '',
    });
    const [states, setStates] = React.useState({
        interviewers: '',
        name: '',
    });
  
    const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

    const handleChanged = (event) => {
        const name = event.target.name;
        setStates({
          ...states,
          [name]: event.target.value,
        });
      };
    

    React.useEffect(() => {
        const db = app.firestore()
   
        db.collection("users/trainee/users")
        .get()
        .then(snap =>{
           const data = snap.docs.map(doc => doc.data())
           console.log(data)
           setUsers(data)
        })
   
    });
    
    return (
      <div>
        <Container component="main" maxWidth="md">
          <div>

          <CssBaseline />

          <div style={{
            marginTop: '9.9em',
            display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>

            <Typography component="h1" variant="h5">
              Hire Developers
            </Typography>
          </div>

          <form  style={{
              width: '80%', // Fix IE 11 issue.
              margin:'20px auto auto auto',
            }}>
              <TextField
                variant='outlined'
                placeholder='Enter Tittle'
                style={{margin:'40px 0 20px 0'}}
                fullWidth
              />

              <div style={{display:'flex'}}>
                <TextField
                  variant='outlined'
                  placeholder='Enter Time'
                  name='number'
                  style={{margin:'0 0 20px 0'}}
                  fullWidth
                />

                <TextField
                  variant='outlined'
                  placeholder='Enter Place'
                  fullWidth
                  style={{margin:'0 0 0 10px'}}
                />
              </div>
              <div style={{display:'flex'}}>
              <FormControl className={classes.formControl}>
                    <NativeSelect
                    className={classes.selectEmpty}
                    value={states.interviewers}
                    name="interviewers"
                    onChange={handleChanged}
                    inputProps={{ 'aria-label': 'age' }}
                    >
                    <option value="" disabled>
                        Interviewers
                    </option>
                    <option>Angel Nantume</option>
                    <option>Wandera Rogers</option>
                    </NativeSelect>
                    <FormHelperText>Interviewers</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <NativeSelect
                    className={classes.selectEmpty}
                    value={state.interviewes}
                    name="interviewes"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'age' }}
                    >
                    <option value="" disabled>
                        Interviewes
                    </option>
                    <option value={10}>Jude  Mark</option>
                    <option value={20}>Namwanza Ronnie</option>
                    </NativeSelect>
                    <FormHelperText>Interviewes</FormHelperText>
                </FormControl>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  margin:'3px, 0, 0,  2px',
                }}
              >
                Create
              </Button>
            </form>

          </div>
        </Container>
      </div>
    );
}

export default Interviews;

