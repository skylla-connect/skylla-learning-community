import React from 'react';
import './Challenges.css';
import app from 'firebase/app';
import NavTab from './Tabs';
import Typography from '@material-ui/core/Typography';

class Challenges extends React.Component{
    render(){
        return(
            <div>
                <div className='challenges'>
                    <a href="#general" ><img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
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
                        Challenges
                        </Typography>

                </div>
                <div>
                    <NavTab />
                </div>
            </div>
        )
    }
}
export default Challenges ;