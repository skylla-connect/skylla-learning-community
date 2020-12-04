import  React from 'react';
import './QuizTests.css';
import {Typography, Divider, Button} from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
// import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'firebase/firestore'
import { withFirebase } from '../firebase';
import app from 'firebase/app'

class QuizTests extends React.Component{
    constructor(props) {
        super(props);
     
        this.state = {
          loading: false,
          assessments:[],
          users:[]
        };
        this.db  = app.firestore()
      }
     
      componentDidMount() {
        this.setState({ loading: true });
        this.db.collection(`users/admin/dashboard/assessment/assessments`)
        .get()
        .then(querySnapshot =>{
            const data = querySnapshot.docs.map(doc=> doc.data());
            console.log(data)
            this.setState({users:data})
        })
      }
    render(){
        return(
            <div>
                <ul>
                    {this.state.users.map(user => (
                    <li key={user.uid}>
                        <span>
                        <strong>ID:</strong> {user.uid}
                        </span>
                        <span>
                        <strong>Username:</strong> {user.email}
                        </span>
                        <span>
                        <strong>Tittle:</strong> {user.tittle}
                        </span>
                        <span>
                        <strong>Description:</strong> {user.tittle}
                        </span>
                        <span>
                        <strong>Content:</strong> {user.tittle}
                        </span>
                    </li>
                    ))}
                </ul>
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
export default withFirebase(QuizTests);