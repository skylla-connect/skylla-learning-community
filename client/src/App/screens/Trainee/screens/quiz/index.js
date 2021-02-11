import  React from 'react';
import './index.css';
import { Typography } from '@material-ui/core'
import 'firebase/firestore'
import { withFirebase } from '../../../../firebase';
import app from 'firebase/app'
import Editor from './editor';

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
        this.db.collection(`users/admin/dashboard/quiz/Tquiz`)
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
                    <div className='card'>
                        <div className='quiz'>
                            <div>
                                {this.state.users.map(user => (
                                    <ul key={user.uid} style={{
                                        marginBottom: 80
                                        }}>
                                        <li>
                                            <h3>
                                                <strong>
                                                    Instructions:
                                                </strong>
                                            </h3>
                                            <br />

                                            <p>
                                                Answer the the following question in the editor provided below.
                                            </p> 
                                            <br />
                                        
                                            <span className='li-w'>
                                                <Typography variant='h6' style={{ lineHeight: 2, margin:'20px 0 0 0'}}>
                                                    <p style={{
                                                        textTransform: 'capitalize'
                                                    }}> 
                                                        Qn: {user.tittle}
                                                    </p>
                                                </Typography> 
                                            </span>
                                            <br />

                                            <span className='li-w'>
                                                <p> 
                                                    <strong style={{marginRight: 10}}>
                                                        Asked by :
                                                    </strong> 
                                                    {user.username} 
                                                </p>
                                            </span>
                                            <br />

                                            <span className='li-w'>
                                                <p>
                                                    <strong style={{marginRight: 10}}>
                                                        Created On :
                                                    </strong> 
                                                    {user.createdAt} 
                                                </p>
                                            </span>
                                            <br />

                                            <span className='li-w'>
                                                <p>
                                                    <strong style={{marginRight: 10}}>
                                                        Description :
                                                    </strong>  
                                                    {user.description} 
                                                </p>
                                            </span>
                                            <br />

                                            <span className='li-w'>
                                                <p style={{marginRight: 10}}> 
                                                    <strong style={{marginRight: 10}}>
                                                        Content :
                                                    </strong>  
                                                    {user.content}
                                                </p>
                                            </span>  
                                        </li>  
                                    </ul>
                                ))}
                            </div>
                        </div>

                        <Editor />
                    </div>  
                </div>
            </div>
        )
    }
}
export default withFirebase(QuizTests);