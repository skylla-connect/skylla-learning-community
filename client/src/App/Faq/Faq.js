import React from 'react';
import {Typography, InputBase,Grid,Paper,Button,} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor:'lightblue'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
    paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin:'90px 0 0 0'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
        // backgroundColor:'red'
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    //   backgroundColor:'red',
      color:'gray',
      border:'3px solid white',
      borderRadius:'10px',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  function Faq() { 

      const classes = useStyles();
        return(
            <div>
                <div className='quizmenu'>
                    <a href="#general" > <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
                        alt='pic'
                        style={{
                        width:'10%',
                        height:'50%',
                        float:'left',
                        color:'white',
                        marginTop:'25px',

                        }}
                        />
                    </a>
                        < br/>

                    <Typography 
                    style={{
                        color:'white',
                        textAlign: 'center',
                        fontSize:'20px'

                    }}
                    >
                    Frequently Ask Questions
                    </Typography>
                </div>

                <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                               <Paper className={classes.paper}>
                                 <Typography className={classes.title} variant="h6" noWrap>
                                   Hi Angel,
                                   How can we help you?
                                 </Typography>
                               </Paper>
                            </Grid>

                            <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                    <SearchIcon />
                                    </div>
                                    <InputBase
                                    placeholder="Type key word to find answers……"
                                    classes={{
                                        root: classes.inputRoot,  
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    />
                            </div>
                            </Paper>
                            </Grid>
                    

                        </Grid>

                </div>
                <div>
                    {/* <Typography> How can we help you</Typography> */}
                    {/* <InputBase
                        placeholder="Type key word to find answers…"
                        classes={{
                            root: classes.inputRoot,  
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    /> */}
                    {/* <input type='text' placeholder='Type key word to find answers…' /> */}
                    
                </div>
                

               
            </div>
        )
    
}

export default Faq;