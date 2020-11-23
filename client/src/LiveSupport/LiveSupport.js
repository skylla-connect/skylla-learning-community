import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper,Divider,Typography } from '@material-ui/core';
import Footer from '../app/components/Footer/footer'
import MenuLive from '../LiveSupport/MenuLive'
import Tabs from '../LiveSupport/Tabs'
import './LiveSupport.css'
import Carousel from 'react-bootstrap/Carousel';
// import Radio from '@material-ui/core/Radio';



const useStyles = makeStyles((theme) => ({
    carousel: {
        // backgroundColor: 'black',
        width: '100%',
        padding: 20
        // zIndex: 1,
        // position: 'absolute',
    },
    carouselImg: {
        width: '30%',
        position: 'relative',
        margin: '0 0 0 10%',
    },
    caption: {
        width: '35%',
        height: 'auto',
        // border: '1px solid black',
        borderRadius: 70,
        // position: 'absolute',
        margin: '0 10% 0 0',
        float: 'right',
        top: '0%',
        padding: 40,
        color: 'auto',
    },
}));

export default function LiveSupport() {
    const classes = useStyles();
    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, []);
    
        return(
            <div>
                <MenuLive/>

                <Tabs/>
                
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
                            <Typography style={{fontSize: '100%', lineHeight: 2, margin:'20px 0 0 0'}}>
                                When starting a live Chat please indicate the Fullname 
                                and email address associated with
                                your Namecheap account. This will help speed up our verification
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
                            <Typography style={{fontSize: '100%', lineHeight: 2, margin:'20px 0 0 0'}}>
                                When starting a live Chat please indicate the Fullname 
                                and email address associated with
                                your Namecheap account. This will help speed up our verification
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
                            <Typography style={{fontSize: '100%', lineHeight: 2, margin:'20px 0 0 0'}}>
                                When starting a live Chat please indicate the Fullname 
                                and email address associated with
                                your Namecheap account. This will help speed up our verification
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
                    <p style={{margin:'20px 0% 0 15%'}}>Need help? We are always here for you  <button className='butt'>Live Support</button></p>
                    
                </div>
            
                <Footer />
        </div>
    )
}

