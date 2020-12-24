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
        width:'50%',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
    accordion: {
       margin:'auto',
       width:'80%',
       [theme.breakpoints.down('sm')]:{
        width:'96%',
       
      }
    },
    logo:{
      width:'10%',
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
    }
  }));

  function Faq() { 

      const classes = useStyles();
        return(
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
                    FAQ
                    </Typography>
                </div>
                

                <div className={classes.root}>
                    <div>
                      <Typography variant='h4' style={{textAlign:'center'}}>
                        Frequently Asked Questions
                      </Typography>
                    </div>
                    <div className={classes.accordion}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>How to get started ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            
                              <Typography>
                                  please go to skyllaconnect.com then Skylla Learning Community then purchase  a module
                              </Typography>
                            </AccordionDetails>
                        </Accordion>  
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>How to purchase a module ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    After you apply, you'll be sent an email detailing next steps
                                </Typography>
                            </AccordionDetails>
                        </Accordion>  
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>Is there an age limit for candidates considered for the fellowship ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                   You must be alteast 15 years and above to  be admitted into the program and to sign Skylla's employment contract.
                                </Typography>
                            </AccordionDetails>
                        </Accordion> 
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>Do I need a university degree before purchasing a module with Skylla Learning Community ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    No, you do not need a university degree
                                </Typography>
                            </AccordionDetails>
                        </Accordion> <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}> How to become a software developer ?</Typography>
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
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>For how long does it take for me to become a software developer ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                  The length of time it takes to become a software engineer can depend upon a student’s background 
                                  knowledge and their commitment and dedication to completing their modules
                                </Typography>
                            </AccordionDetails>
                        </Accordion> 
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}> How much does a module cost ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    No, you do not need a university degree
                                </Typography>
                            </AccordionDetails>
                        </Accordion> 
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>For how long does each module take ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    No, you do not need a university degree
                                </Typography>
                            </AccordionDetails>
                        </Accordion> 
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>What is the cloud ?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                  It is a collection of networked computer hardware that works together to 
                                  provide many aspects of computing in the form of online services. You can't
                                  physically touch the hardware itself in the public cloud, but you control it 
                                  remotely via web interfaces. One of the central features of the cloud is virtualisation
                                </Typography>
                            </AccordionDetails>
                        </Accordion> 

                     </div>
                </div>
            </div>
        )    
}

export default Faq;



