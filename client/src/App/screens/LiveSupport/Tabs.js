import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Divider,Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import './LiveSupport.css'
import Carousel from 'react-bootstrap/Carousel';
import Card from '@material-ui/core/Card';
import './Tabs.css'
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import HealingIcon from '@material-ui/icons/Healing';
import {Link} from 'react-router-dom'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import Footer from '../../components/Footer/footer';
import *as ROUTE from '../../config/routes';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#ddd' ,
  },
  carousel: {
    width: '100%',
    padding: 20
},
carouselImg: {
    width: '30%',
    position: 'relative',
    margin: '0 0 0 10%',
},
caption: {
    width: '50%',
    height: 'auto',
    borderRadius: 70,
    margin: '0 10% 0 0',
    float: 'right',
    top: '0%',
    padding: 40,
    color: 'auto',
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      width: '100%',
    }
    
},

captionParagraph: {
  fontSize: '100%', 
  lineHeight: 2, 
  margin:'20px 0 0 0',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'justify',
  }
},

tab: {
  '&:focus':{outline: 'none'}
}
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.roots}>
      <AppBar 
        elevation={0} 
        position="static" 
        style={{
          backgroundColor:'lightgrey', 
          height: 'auto', 
          color:'black',
          textTransform:'lowercase',
          }}
        >
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              height: "2px",
              width: 0, 
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',              
              borderBottom: '16px solid white',
              marginLeft: '10%',
              backgroundColor: 'transparent',
            }
          }}
        >
          <Tab 
            className={classes.tab}
            label="General" 
            {
              ...a11yProps(0)} 
              style={{color:'black', 
              border: 'none'
            }}
          />

          <Tab 
            className={classes.tab}
            label="Product &amp; Services" 
            {...a11yProps(1)} 
            style={{
              color:'black',
              }} 
          />

          <Tab 
            className={classes.tab}
            label="Purchase Module" 
            {...a11yProps(2)} 
            style={{
              color:'black', 
            }}
          />

          <Tab
            className={classes.tab} 
            label="Code &amp; Debug" 
            {...a11yProps(3)} 
            style={{
              color:'black',
            }} 
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className='para'>
            <p>Have a general question about Skylla Products or services? You've come to the right place. Click the 'Live Support Online' button
                to connect with one our helpful support staffers or consult our  knowledge base for an answer.
            </p>
        </div>

        <div className='para'>
            <h3 style={{marginTop:'20px'}}>Relevant Articles</h3>
            <ul className='para'>
                <li>aim higher</li>
                <li>aim higher</li>
                <li>aim higher</li>
            </ul>
        </div>

        <Carousel className={classes.carousel}> 
          <Carousel.Item >
              <div className={classes.caption}>
                  <Typography style={{fontSize: '240%', margin:'auto', color:'auto'}}>How To Get a Reply Fast</Typography>
                  <Divider style={{margin: '0 0 20px 0'}}/>
                  <Typography className={classes.captionParagraph}>
                      When starting a live Chat please indicate the Fullname 
                      and email address associated with
                      your Skylla Learning Community account. 
                      This will help speed up our verification
                      and investigation processes
                  </Typography>
              </div>  
              <img 
                  alt=""   
                  className={classes.carouselImg} 
                  src='https://skyllaconnect.com/static/media/devops-development-cycles-automation-monitoring-all-steps-software-construction_6280-79-01-01.322b77c7.png'
              />  
          </Carousel.Item> 

          <Carousel.Item  >
              <div className={classes.caption}>
                  <Typography style={{fontSize: '240%', margin:'auto', color:'auto'}}>More Tips</Typography>
                  <Divider style={{margin: '0 0 20px 0'}}/>
                  <Typography className={classes.captionParagraph}>
                      When starting a live Chat please indicate the Fullname 
                      and email address associated with
                      your Skylla Learning Community account. This will help speed up our verification
                      and investigation processes  
                  </Typography>
              </div>  
              <img 
                  alt=""   
                  className={classes.carouselImg} 
                  style={{borderRadius:'7px 0 7px 0'}} 
                  src='https://skyllaconnect.com/static/media/devops-development-cycles-automation-monitoring-all-steps-software-construction_6280-79-01-01.322b77c7.png'
              />     
          </Carousel.Item>

          <Carousel.Item  >
              <div className={classes.caption}>
                  <Typography style={{fontSize: '240%', margin:'auto', color:'auto'}}>Give Feedback</Typography>
                  <Divider style={{margin: '0 0 20px 0'}}/>
                  <Typography className={classes.captionParagraph}>
                      When starting a live Chat please indicate the Fullname 
                      and email address associated with
                      your Skylla Learning Community account. This will help speed up our verification
                      and investigation processes 
                  </Typography>
              </div>  
              <img 
                  alt=""  
                  className={classes.carouselImg}  
                  src='https://skyllaconnect.com/static/media/devops-development-cycles-automation-monitoring-all-steps-software-construction_6280-79-01-01.322b77c7.png'  
              />  
          </Carousel.Item>   
        </Carousel>

        <div className='para2'>
            <p style={{margin:'20px 0% 0 15%'}}>
              Need help? We are always here for you  
              <button className='butt'>
                <Link to={ROUTE.CHAT} style={{color:'white'}}> 
                  Live Support
                </Link></button>
            </p>
            
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        
          <div className='services' >
            <div className='serv'>
              <Typography variant="h4" style={{textAlign:'center'}}>
                Our Services
              </Typography>

              <Card elevation='5' className='servs'> 
                <Typography variant="body1" paragraph>
                  <SettingsInputAntennaIcon style={{color:'green', marginRight: 10}}/>
                  Train Software Developers and employ them
                </Typography>
                
                <Typography variant="body1" paragraph>
                  <DeviceHubIcon style={{color:'orange', marginRight: 10}}/>
                  Develop Softwares
                </Typography>

                <Typography variant="body1" paragraph>
                  <SupervisedUserCircleIcon style={{color:'crimson', marginRight: 10}}/> 
                  Hire Software Engineers
                </Typography>

                <Typography variant="body1" paragraph>
                  <CloudDoneIcon style={{color:'darkblue', marginRight: 10}}/>
                  Cloud Consultancy
                </Typography>

                <Typography variant="body1" paragraph>
                  <HealingIcon style={{color:'tomato', marginRight: 10}}/>
                  Technical support and software Maintainance and Upgrade
                </Typography>

                <Typography variant="body1" paragraph>
                  <DeveloperModeIcon  style={{color:'blueviolet', marginRight: 10}}/>
                  Software Engineering and DevOp
                </Typography>

                <Typography variant="body1" paragraph>
                  <OpenWithIcon style={{color:'turquoise', marginRight: 10}}/>
                  Remote and On Premise Infrastructure
                </Typography>

                <Typography variant="body1" paragraph>
                  <ContactSupportIcon style={{color:'yellowgreen', marginRight: 10}}/>
                  Support Open Source Software
                </Typography>

                <Typography variant="body1" paragraph>
                  <ReceiptIcon style={{color:'magenta', marginRight: 10}}/>
                  Sale Software
                </Typography>

                <Typography variant="body1" paragraph>
                  <SubscriptionsIcon style={{color:'rebeccapurple', marginRight: 10}}/>
                  Software Subscription
                </Typography>
              </Card>
            </div>

            <div className='serv2'>
              <Typography variant="h4" style={{textAlign:'center'}}>
                Our Products
              </Typography>

              <Card elevation='5' className='servs'> 
                <Typography variant="body1" paragraph>
                  Softwares;
                  Accounting Software,
                  School Management Systems,
                  Travel agency software,
                  Cloud Consultancy,
                  Software Installation,
                  Support and Maintainance
                  etc
                </Typography>

                <Typography variant="body1" paragraph>
                  We avail Software Engineers for hire
                </Typography>

                <Typography variant="body1" paragraph>
                  Train and employ Software Developers/Engineers
                </Typography>
              </Card>
            </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={2} >
        How to purchase modules
        <Link to='/module'> purchase</Link> 
      </TabPanel>

      <TabPanel value={value}index={3}>
        Get Live Coding Suport from Skylla Senior developers
      </TabPanel>

      <div style={{margin: 40}}>
        <Footer />
      </div>
    </div>
  );
}
