import React from 'react';
import {Typography, InputBase,Grid,Paper} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width:'90%',
      // backgroundColor:'blue',
      margin:'5% 5%  5%  5% '
    },
     heading: {
     fontSize: theme.typography.pxToRem(15),
     fontWeight: theme.typography.fontWeightRegular,
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
    margin:'40px 0 0 0',
    height:'50px'
    },
    accordion: {
       marginTop:'15px'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: '90%',
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
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      color:'black',
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
                    FAQ
                    </Typography>
                </div>

                <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                               <Paper className={classes.paper}>
                                 <Typography className={classes.title} variant="h6" noWrap>
                                   Hi,
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
                                    placeholder="search……"
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
                        {/* gjghjghgh */}
                    <div className={classes.accordion}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography className={classes.heading}>How to purchase a module</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                     go to the  trainees dashboard select cart and follow the procedures. 
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>How to get Live Support</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                go to the  trainees dashboard select support icon and follow the procedures. 
                                </Typography>
                            </AccordionDetails>
                        </Accordion>  
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>How to start Live Chat</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Click Live support page and follow continue.....
                                </Typography>
                            </AccordionDetails>
                        </Accordion> 
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>How to join learning community</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    create an account login and purchase a module
                                </Typography>
                            </AccordionDetails>
                        </Accordion> 
                     </div>
                </div>
            </div>
        )    
}

export default Faq;



