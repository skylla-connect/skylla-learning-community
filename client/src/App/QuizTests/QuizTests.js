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
          users:[],
          color:null
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
      radioHandler = (e) =>{
         this.setState({
             color :  e.target.value
         })
      }
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
                   <div>
                   {this.state.users.map(user => (
                       <ul key={user.uid}>
                           <h1>Instructions:</h1>
                           <p>
                                Choose an answer and hit 'next'. You will
                                receive your score and answers at the end
                            </p> 
                           <li className='li-w'>
                                <Typography  style={{fontSize: '100%', lineHeight: 2, margin:'20px 0 0 0'}}>{user.tittle}</Typography> 
                           </li>
                           <li className='li-w'>
                                <p>Asked by :</p>
                           </li>
                            <Divider style={{margin: '0 0 20px 0', width:'300px' ,height: '2px',}}/>
                            <li className='li-w'>
                                <FormControlLabel 
                                    value="designing software around the needs of a user" 
                                    control={<Radio />} 
                                    label={user.content}
                                    value='black'
                                    checked={this.state.color === 'black'} 
                                    onChange={this.radioHandler}
                                />
                                <br/> 
                                <FormControlLabel 
                                    value="designing software around the needs of a user" 
                                    control={<Radio />} 
                                    label={user.content}
                                    value='blue'
                                    checked={this.state.color === 'blue'}
                                    onChange={this.radioHandler}
                                />
                                <br/> 
                                <FormControlLabel 
                                    value="designing software around the needs of a user" 
                                    control={<Radio />} 
                                    label={user.content}
                                    value='red'
                                    checked={this.state.color === 'red'}
                                    onChange={this.radioHandler}
                                />
                                <br/> 
                            </li>
                            <Button variant='contained' color='secondary'style={{marginTop:'30px', width:'15%'}} >Next</Button>
                       </ul>
                   ))}
                   </div>
                </div>
                
            </div>
        )
    }
}
export default withFirebase(QuizTests);