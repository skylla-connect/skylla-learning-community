import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, 
    Divider,
    Grid,
    Paper,
    ButtonBase,
    TextField
} from '@material-ui/core';
import clsx from 'clsx';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import LoaderButton from "../components/loader";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FirebaseContext from 'firebase';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextFieldMui from "../../components/textField";
// import {storage} from "firebase"
import 'firebase/firestore';
// import { UserContext } from './userContext';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 'auto',
        margin: '5% 0 0 0'
    },

    BioData: {
        padding: 20,
        flexGrow: 1
    },

    pPic: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
    },

    paper: {
        padding: theme.spacing(4),
        margin: 'auto auto auto 0',
    },

    image: {
        width: 180,
        height: 180,
        borderRadius: 'auto',
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
        margin: theme.spacing(3,7),
    },

    textField: {
        width: '500px',
        display: 'block'
    },
}));

const initialState = {
    Oldpassword: '',
    Newpassword: '',
    ConfirmNewpassword: '',
    showPassword: false,
};


export default function ProfilePage() {
    const classes = useStyles();
    const [values, setValues] = React.useState(initialState);
    const [isChanging, setIsChanging] = React.useState(false);
    const [isChangingP, setIsChangingP] = React.useState(false);
    const [isnotChangingP, setIsnotChangingP] = React.useState(false);
    const clearState = () => {
        setValues({ ...initialState });
    };
    // const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = React.useState('')
    const [imageAsUrl, setImageAsUrl] = React.useState({imgUrl: ''})
    const [currentUserDetails, setcurrentUserDetails] = React.useState({name:'', email:'', password:'', photo: ''})
      

    class userDetails {
        constructor (name, email, password, photo ) {
            this.name = name;
            this.email = email;
            this.password = password;
            this.photo= photo;
        }
    }
    
    // Firestore data converter
    var userDetailsConverter = {
        toFirestore: function(userDetails) {
            return {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password,
                photo: userDetails.photo
            }
        },
        fromFirestore: function(snapshot, options){
            const data = snapshot.data(options);
            const det1 = new userDetails(data.name, data.email, data.password, data.photo);
            return det1
        }
    }

    React.useEffect(() => {
        let user1 = FirebaseContext.auth().currentUser; 
        let db = FirebaseContext.firestore().collection("users/admin/users");
        let query = db.where('uid', '==', user1.uid);

        query.withConverter(userDetailsConverter).get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  

            snapshot.forEach(doc => {
                var x = doc.data();
                setcurrentUserDetails(x)
            // console.log(doc.id, '=>', x);
            ;
            })
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    }, [])

    //   console.log('Image as a file:' + imageAsFile)
        const handleImageAsFile = (e) => {
            const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
        }

        const handleFireBaseUpload = e => {
            e.preventDefault()
          console.log('start of upload')
          // async magic goes here...
          if(imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
          }
          let userCurrent = FirebaseContext.auth().currentUser;
          const uploadTask = FirebaseContext.storage().ref('users/' + userCurrent.uid + `/${imageAsFile.name}`).put(imageAsFile)
          //initiates the firebase side uploading 
          uploadTask.on('state_changed', 
          (snapShot) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot)
          }, (err) => {
            //catches the errors
            console.log(err)
          }, () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            FirebaseContext.auth().onAuthStateChanged(user => {
                if(user) {
                    FirebaseContext.storage().ref('users/' + userCurrent.uid + `/${imageAsFile.name}`).getDownloadURL()
                    .then(fireBaseUrl => {
                    setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
                    console.log(imageAsUrl)
                    let db = FirebaseContext.firestore().collection("users/admin/users");
                    db.doc(userCurrent.uid).update({
                        photo: fireBaseUrl
                      });
                      
                    })
                    setIsChanging(true);
                }
            })
          })
            // alert('Image updated successfully! Please refresh page')
          }
      
        function validateForm() {
            return (
            values.Oldpassword.length > 0 &&     
            //more validation checks needed for the old Password
            values.Newpassword.length > 0 &&
            values.Newpassword === values.ConfirmNewpassword
            );
        }
        

        async function handleChangeClick(event) {
            event.preventDefault();
            const user = FirebaseContext.auth().currentUser;
            let db = FirebaseContext.firestore().collection("users/admin/users");
            if(values.Oldpassword===currentUserDetails.password){
                db.doc(user.uid).update({
                    password: values.Newpassword
                });
                // Get auth credentials from the user for re-authentication. The example below shows
                // email and password credentials but there are multiple possible providers,
                // such as GoogleAuthProvider or FacebookAuthProvider.
                const cred = FirebaseContext.auth.EmailAuthProvider.credential(
                    user.email, 
                    currentUserDetails.password
                );
                FirebaseContext.auth().currentUser.reauthenticateWithCredential(cred)
                .then(() => {
                    // User successfully reauthenticated.
                    const newPass = values.Newpassword;
                    console.log('Password updated successfully!');
                    setIsChangingP(true)
                    return FirebaseContext.auth().currentUser.updatePassword(newPass);
                })
                .catch((error) => { 
                    console.log(error); 
                });
                
                // alert('Password changed successfully!');
                setIsChangingP(true);
                clearState()
                // setIsChangingP(false);

            }else{
                alert('Oops, please check Old Password!');
                setIsnotChangingP(true);
            }
        }
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
            setIsChangingP(false);
      };

      const closeUpload = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
            setIsChanging(false);
      };

      const handleCloseNot = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
            setIsnotChangingP(false);
      };

  return (
    <Paper elevation={0} className={classes.root}>
        <div className={classes.paper}>
            <Grid alignItems='center' justify="center" container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <ButtonBase className={classes.image}>
                        <form onSubmit={handleFireBaseUpload}>
                            <input 
                                accept="image/*" 
                                className={classes.input} 
                                onChange={handleImageAsFile} 
                                id="icon-button-file" 
                                type="file" 
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton 
                                    type="submit" 
                                    className={classes.uploadButton} 
                                    color="primary" 
                                    component="span"
                                >
                                    <PhotoCamera />
                                </IconButton>
                                <LoaderButton
                                    type="submit"
                                    disabled={!imageAsFile}
                                    isLoading={isChanging}
                                    style={{
                                        margin: '140px 0 0 90%',
                                        width:'50%',
                                        position: 'absolute',
                                    }}
                                >
                                    UPLOAD
                                </LoaderButton>
                                <Snackbar open={isChanging} autoHideDuration={6000} onClose={closeUpload}>
                                    <Alert onClose={closeUpload} severity="success">
                                        Great! Photo updated successfully.
                                    </Alert>
                                </Snackbar>
                            </label>
                        </form>
                        <img 
                            className={classes.pPic}  
                            src={
                                    imageAsUrl.imgUrl || 
                                    currentUserDetails.photo || 
                                    'https://www.pngitem.com/pimgs/m/442-4426913_avatar-icon-png-white-png-download-white-person.png'
                                }
                            alt=''
                        />
                    </ButtonBase>
                    <Grid>
                        <Grid alignItems='center' justify="center" container spacing={2} xs={4}>
                            <Grid item>
                                <Typography gutterBottom variant="h4" align='center'>
                                    {currentUserDetails.name}
                                </Typography>
                                <Typography variant="body2" align='center' style={{ cursor: 'pointer', }}>
                                    {currentUserDetails.email}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid alignItems='center' justify="center" container spacing={2} xs={12} sm={6}>
                    <form onSubmit={handleChangeClick}>
                        <FormGroup className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <Typography gutterBottom variant="h5" align='center'>
                                Change Password
                            </Typography>
                        </FormGroup>
                        <FormGroup className={classes.margin}>
                            <TextFieldMui
                                style={{ width:'100%' }}
                                id='Old-Password'
                                type= 'password'
                                value={values.Oldpassword}
                                onChange={handleChange('Oldpassword')}
                                label='Old Password'
                                variant="outlined"
                            />
                        </FormGroup>
                        
                        <FormGroup className={classes.margin} variant="outlined">
                            <TextFieldMui
                                style={{ width:'100%' }}
                                id='New-Password'
                                type= 'password'
                                value={values.Newpassword}
                                onChange={handleChange('Newpassword')}
                                label='New Password'
                                variant="outlined"
                            />
                        </FormGroup>

                        <FormGroup className={classes.margin} variant="outlined">
                            <TextFieldMui
                                style={{ width:'100%' }}
                                id=' Cofirm-New-Password'
                                type= 'password'
                                value={values.ConfirmNewpassword}
                                onChange={handleChange('ConfirmNewpassword')}
                                label='Cofirm New Password'
                                variant="outlined"
                            />
                        </FormGroup>

                        <LoaderButton
                            type="submit"
                            disabled={!validateForm()}
                            isLoading={isChangingP}
                            style={{
                                marginLeft: '9%',
                                width:'82%'
                            }}
                        >
                            Change
                        </LoaderButton>
                        <Snackbar open={isChangingP} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                Great! Password changed successfully.
                            </Alert>
                        </Snackbar>
                        <Snackbar open={isnotChangingP} autoHideDuration={6000} onClose={handleCloseNot}>
                            <Alert onClose={handleCloseNot} severity="error">
                                Oops! Check Old Password.
                            </Alert>
                        </Snackbar>
                    </form>
                </Grid>
            </Grid> 
        </div>
    </Paper>
  );
}
