import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../components/Footer/footer';
import './faq.css'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: '#F2F3F5',
    // borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
    container: {
         marginTop: 60,
         width: '90%',
         margin: '60px auto',
         [theme.breakpoints.down('sm')]: {
             width: '100%'
         }
    },
    logo:{
      width:'15%',
      height:'50%',
      float:'left',
      color:'white',
      marginTop:'20px',
      alignItems:'center',
      [theme.breakpoints.down('sm')]:{
        width:'30%'
      }
    },

    menu:{
      width:'100%',
      backgroundColor:'blue',
      height:'70px'
    },

    paper: {
        padding: theme.spacing(5),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        borderRadius: 0,
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
         }
    },

    paperOne: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        border: '1px solid white',
    },

    article: {
        height: '1.25rem',
        width: '1.25rem',
        margin: 'auto 10px auto 10px',
        [theme.breakpoints.down('sm')]: {
            margin: 'auto 0px auto 0px',
        }
    }
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');
   const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
        <div className={classes.menu}>
            <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
            className={classes.logo}
            alt='pic'
            
            />
            <br/>
            <Typography 
            style={{
                color:'white',
                textAlign: 'center',
                fontSize:'20px'

            }}
            >
                Frequently Asked Questions
            </Typography>
        </div>

        <div className={classes.container}>
            <Grid container>
                <Grid item xs={8} className={classes.grid}>
                    <Paper className={classes.paper}>
                        <Accordion 
                            square 
                            expanded={expanded === 'panel1'} 
                            onChange={handleChange('panel1')}
                            style={{
                                borderTop: 'none'
                            }}>
                            <AccordionSummary 
                                aria-controls="panel1d-content" 
                                id="panel1d-header"
                                expandIcon={<ExpandMoreIcon />}
                                >
                                <Typography>
                                    How to get started ?
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography>
                                    Go to <a href=""> https://skyllaconnect.com/learn </a>  
                                    then Skylla Learning Community then purchase a module.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary 
                                aria-controls="panel2d-content" 
                                id="panel2d-header"
                                expandIcon={<ExpandMoreIcon />}
                                >
                                <Typography> How to purchase a module ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Step #1: Register <br />
                                    Step #2: Click on Modules <br />
                                    Step #3: Purchase Module  <br />
                                    Step #4: Go to the Cart <br />
                                    Step #5: Choose the mode of payment and confirm <br />
                                    Step #6: Complete payment  <br />
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary 
                                aria-controls="panel3d-content" 
                                id="panel3d-header"
                                expandIcon={<ExpandMoreIcon />}
                                >
                            <Typography>
                                Is there an age limit for candidates considered for the fellowship ?
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                You must be alteast 12 years and above to  be admitted into the program and to sign Skylla's employment contract.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>

                        
                        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary 
                                aria-controls="panel3d-content" 
                                id="panel3d-header"
                                expandIcon={<ExpandMoreIcon />}
                                >
                            <Typography>
                                 Do I need a university degree to Join Skylla Learning Community ?
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                 No, you do not need a university degree
                            </Typography>
                            </AccordionDetails>
                        </Accordion>

                        
                        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary 
                                aria-controls="panel3d-content" 
                                id="panel3d-header"
                                expandIcon={<ExpandMoreIcon />}
                                >
                            <Typography>
                               How to become a software developer ?
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                Step #1: Be Clear About Your End Goal<br/>
                                Step #2: Select A Language to Learn<br/>
                                Step #3: Read and write Codes Written by Experienced Developers<br/>
                                Step #4: Practice software development…and practice some more <br/>
                                Step #5: Use tools that real software developers use<br/>
                                Step #6: Find A Community of Software Engineers<br/>
                                Step #7: Build Projects<br/>
                                Step #8: Accept the job offer and officially become a software engineer!
                            </Typography>
                            </AccordionDetails>
                        </Accordion>

                        
                        <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary 
                                aria-controls="panel3d-content" 
                                id="panel3d-header"
                                expandIcon={<ExpandMoreIcon />}
                                >
                            <Typography>
                                For how long does it take for me to become a software developer ?
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                The length of time it takes to become a software engineer depends upon a student’s background 
                                knowledge, commitment and dedication to completing their modules.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                </Grid>

                <Grid item xs className={classes.grid}>
                    <div className={classes.paperOne}>
                        <div>
                            <Typography variant="h6" style={{color: 'black'}}>
                               Help Center
                            </Typography>
                        </div>

                        <div style={{
                            textAlign: 'left',
                            width: '100%',
                            margin: '40px auto'
                        }}>
                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    Troubleshoot issues with the system
                                </Typography>
                            </a>

                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    Known issues with system
                                </Typography>
                            </a>

                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    Report a problem with system
                                </Typography>
                            </a>

                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    System Security &amp; Privacy for users
                                </Typography>
                            </a>

                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24">
                                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path>
                                    </svg>
                                    Report any abuse
                                </Typography>    
                           </a>
                        </div>
                    </div>

                    <div className={classes.paperOne}>
                        <div style={{
                            textAlign: 'left',
                            width: '100%',
                            margin: '40px auto'
                        }}>
                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    Joining Skylla Learning Community 
                                </Typography>
                            </a>

                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    Set up and view live streams
                                </Typography>
                            </a>

                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    Live class is unresponsive 
                                </Typography>
                            </a>

                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    ​Can't hear the trainer 
                                </Typography>
                            </a>

                            <a href="#" style={{color: ' rgba(0, 0, 0, 0.87)'}}>
                                <Typography variant="body1">
                                    <svg className={classes.article} viewBox="0 0 24 24">
                                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path>
                                    </svg>
                                   Cannot join live class
                                </Typography>    
                           </a>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>

        <Footer />
    </div>
  );
}
