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
// import {storage} from "firebase"
import 'firebase/firestore';
// import { UserContext } from './userContext';


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
        margin: theme.spacing(3,13),
    },

    textField: {
        width: '500px',
        marginLeft: '5%',
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
        // let uID = FirebaseContext.firestore().collection("users").doc(user1.uid)    
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
            values.Oldpassword.length > 0 &&     //more validation checks needed for the old Password
            values.Newpassword.length > 0 &&
            values.Newpassword === values.ConfirmNewpassword
            );
        }
        

        async function handleChangeClick(event) {
            event.preventDefault();
            setIsChanging(true);
            let userCurrent = FirebaseContext.auth().currentUser;
            let db = FirebaseContext.firestore().collection("users/admin/users");
            if(values.Oldpassword===currentUserDetails.password){
                db.doc(userCurrent.uid).update({
                    password: values.Newpassword
                  });
                  alert('Password changed successfully!')
            }else{
                alert('The Old Password does not match the current one!')
            }
            
        } 

        const handleSave = () => {
            window.location.reload()
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
                <Grid item xs={12} sm={6}>
                    <ButtonBase className={classes.image}>
                        <form onSubmit={handleFireBaseUpload}>
                        <input accept="image/*" className={classes.input} onChange={handleImageAsFile} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton type="submit" className={classes.uploadButton} color="primary" component="span">
                            <PhotoCamera />
                            </IconButton>
                            {/* <button disabled={!imageAsFile}>upload</button> */}
                            <LoaderButton
                                // block
                                type="submit"
                                // bsSize="large"
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
                        </label>
                        </form>
                        <img 
                            className={classes.pPic}  
                            src={imageAsUrl.imgUrl || currentUserDetails.photo || 'https://www.pngitem.com/pimgs/m/442-4426913_avatar-icon-png-white-png-download-white-person.png'}
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
                    <Typography gutterBottom variant="h5">
                        Change Password
                    </Typography>
                    <form onSubmit={handleChangeClick}>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                        <OutlinedInput
                            style={{ width:'100%' }}
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
                    <Divider style={{ margin:'20px 23% 20px 18%', width:'60%' }}/>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            style={{ width:'100%' }}
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
                            style={{ width:'100%' }}
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
                            marginLeft: '5%',
                            width:'83%'
                        }}
                    >
                        Change
                    </LoaderButton>
                    </form>
                </Grid>
            </Grid>
            {/* <Divider style={{ margin:'30px 0 50px 0' }}/> */} 
        </div>
    </Paper>
  );
}
