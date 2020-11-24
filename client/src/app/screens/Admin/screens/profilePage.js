import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, 
    Divider,
    Grid,
    Paper,
    ButtonBase
} from '@material-ui/core';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LoaderButton from "../components/loader";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FirebaseContext from 'firebase';
import 'firebase/firestore';
// import { UserContext } from './userContext';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        width: '50%',
        height: 'auto',
        margin: '5% 25% 0 25%'
    },

    BioData: {
        padding: 20,
        flexGrow: 1
    },

    pPic: {
        width: '100%',
        borderRadius: '50%',
        // margin: 'auto 23% 0 23%'
    },

    paper: {
        padding: theme.spacing(4),
        margin: 'auto auto auto 0',
        // maxWidth: 500,
    },

    image: {
        width: 180,
        height: 180,
        // margin: 'auto 80% 0 80%'
    },

    input: {
        display: 'none',
    },

    uploadButton: {
        position: 'absolute',
        margin: '30% 0 0 70%',
        backgroundColor: 'black'
    },

    margin: {
        margin: theme.spacing(3,13),
    },

    textField: {
        width: '300px',
        marginLeft: '18%',
        display: 'block'
    },
}));



export default function ProfilePage() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        Oldpassword: '',
        Newpassword: '',
        ConfirmNewpassword: '',
        showPassword: false,
      });
      const [isChanging, setIsChanging] = React.useState(false);
    //   const currentUser = useContext(UserContext)
      const [currentUserDetails, setcurrentUserDetails] = React.useState({name:'', email:'', password:''})
      
      class userDetails {
        constructor (name, email, password ) {
            this.name = name;
            this.email = email;
            this.password = password;
        }
        // toString() {
        //     return this.name + ', ' + this.email + ', ' + this.password;
        // }
    }
    
    // Firestore data converter
    var userDetailsConverter = {
        toFirestore: function(userDetails) {
            return {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password
                }
        },
        fromFirestore: function(snapshot, options){
            const data = snapshot.data(options);
            const det1 = new userDetails(data.name, data.email, data.password);
            return det1
        }
    }

        function validateForm() {
            return (
            values.Oldpassword.length > 0 &&     //more validation checks needed for the old Password
            values.Newpassword.length > 0 &&
            values.Newpassword === values.ConfirmNewpassword
            );
        }
        
        React.useEffect(() => {
            let user1 = FirebaseContext.auth().currentUser;
            // let uID = FirebaseContext.firestore().collection("users").doc(user1.uid)    
            let db = FirebaseContext.firestore().collection("users/trainee/users");
            let query = db.where('userId', '==', user1.uid);

            query.withConverter(userDetailsConverter).get()
            .then(snapshot => {
                if (snapshot.empty) {
                console.log('No matching documents.');
                return;
                }  

                snapshot.forEach(doc => {
                    var x = doc.data();
                    setcurrentUserDetails(x)
                console.log(doc.id, '=>', x);
                ;
                })
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        }, [])

        async function handleChangeClick(event) {
            event.preventDefault();
            setIsChanging(true);
            
            //Firebase user session authentication
            
        } 


    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

  return (
    <Paper elevation={0} className={classes.root}>
        <div className={classes.paper}>
            <Grid alignItems='center' justify="center" container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton className={classes.uploadButton} color="primary" component="span">
                            <PhotoCamera />
                            </IconButton>
                        </label>
                        <img 
                            className={classes.pPic} 
                            src={'https://www.pngitem.com/pimgs/m/442-4426913_avatar-icon-png-white-png-download-white-person.png'} 
                            alt='Profile Pic'
                        />
                    </ButtonBase>
                </Grid>
            </Grid>
            <Grid>
                    <Grid item xs alignItems='center' justify="center" container spacing={2}>
                        <Grid item >
                            <Typography gutterBottom variant="h4" align='center'>
                                {currentUserDetails.name}
                            </Typography>
                            <Typography variant="body2" align='center' style={{ cursor: 'pointer', }}>
                                {currentUserDetails.email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            <Divider style={{ margin:'30px 0 50px 0' }}/>
            <Grid alignItems='center' justify="center" container spacing={2}>
                <Typography gutterBottom variant="h5">
                    Change Password
                </Typography>
                <form onSubmit={handleChangeClick}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'Oldpassword'}
                        value={values.Oldpassword}
                        onChange={handleChange('Oldpassword')}
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
                        labelWidth={100}
                    />
                </FormControl>
                <Divider style={{ margin:'20px 23% 20px 23%', width:'60%' }}/>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'Newpassword'}
                        value={values.Newpassword}
                        onChange={handleChange('Newpassword')}
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
                        labelWidth={110}
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'ConfirmNewpassword'}
                        value={values.ConfirmNewpassword}
                        onChange={handleChange('ConfirmNewpassword')}
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
                        labelWidth={170}
                    />
                </FormControl>
                <LoaderButton
                    // block
                    type="submit"
                    // bsSize="large"
                    disabled={!validateForm()}
                    isLoading={isChanging}
                    style={{
                        marginLeft: '40%'
                    }}
                >
                    Change
                </LoaderButton>
                </form>
            </Grid>
        </div>
    </Paper>
  );
}
