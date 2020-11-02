import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// send user's data into the database
import firebase from '../../../../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        },
    },

    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },

    textField: {
        width: '100%',
    },

    container: {
      width: '50%',
      margin: '30px auto'
    },

    button: {
        width: '100%',
        margin: '10px auto'
    },

    btn: {
        backgroundColor: '#EDEDED',
        color: 'black',
        width: '100%',
        padding: 15,
        disply: 'block',
        textAlign: 'center',
        marginLeft: '1.7%',
        marginRight: '1.7%',
        marginTop: 8
    }
}));

export default function TextFieldSizes() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        email: '',
        password: '',
        showPassword: false,
    });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const handleSubmit = (event) => {
        event.preventDefault()
        let addUsers = firebase.db.collection('users').doc('trainee');
        addUsers.set({
            email: "test@skyllaconnect.com",
            name: 'Ronnie Web',
            password: 'pass001',
        })
        .then(documentReference => {
        console.log('document reference ID', documentReference.id)
        })
        .catch(error => {
        console.log(error.message)
        })
    } 

  return (
    <form className={classes.root} Validate autoComplete="off" handleSubmit>
        <Typography variant="h6" paragraph style={{textAlign: 'center'}}>
            Create users
        </Typography>
        <div className={classes.container}>
            <TextField
                required
                label="Full Name"
                id="outlined-size-normal"
                variant="outlined"
                value={values.name}
                onChange={handleChange('name')}
                style={{width: '100%'}}
            />

            <TextField
                required
                label="E-mail Address"
                id="outlined-size-normal"
                variant="outlined"
                value={values.email}
                style={{width: '100%'}}
                onChange={handleChange('email')}
            />

            <div> 
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                
                <Button variant="outlined" className={classes.btn}>
                    Create
                </Button>
            </div>
        </div>
    </form>
  );
}
