import  React from 'react';
import './QuizTests.css';
import {Typography, Divider, Button} from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class QuizTests extends React.Component{
    render(){
        return(
            <div>
                <div className='quizmenu'>
                    <a href="#general" > <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
                        alt='pic'
                        style={{
                        maxWidth:'40%',
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
                            fontSize:'30px'
                        
                        }}
                        >
                       Quiz&Tests
                    </Typography>
                </div>

                <div className='quiz'>
               <h1>Instructions:</h1> 
                <p>Choose an answer and hit 'next'. You will receive your score and answers at the end</p>
               <Typography  style={{fontSize: '100%', lineHeight: 2, margin:'20px 0 0 0'}}>What is user interface design?</Typography> 
               <Divider style={{margin: '0 0 20px 0', width:'300px' ,height: '2px',}}/>
               <FormControlLabel value="designing software around the needs of a user" control={<Radio />} label="Designing software around the needs of a user" /><br/>
               <FormControlLabel value="making an app run fast" control={<Radio />} label="Making an app run fast" /><br/>
               <FormControlLabel value="creating an app" control={<Radio />} label="Creating an app" /><br/>
               
                <Button variant='contained' color='secondary'style={{marginTop:'30px', width:'15%'}} >Next</Button>
                </div>
                
            </div>
        )
    }
}
export default QuizTests;


