import  React from 'react';
import {Typography, Divider, Button} from '@material-ui/core'
import 'firebase/firestore'
import { withFirebase } from '../firebase';
import app from 'firebase/app'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    card: {
        padding: theme.spacing(2),
        // margin: 'auto',
        width:  '70%',
        margin: `${theme.spacing(1)}px auto`,
        [theme.breakpoints.down('sm')]: {
            width:'90%'
        },
    },
    
});

class Problems extends React.Component{
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
     
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                
                <Card elevation={3} className={classes.card}>
                    <div >
                    <div>
                    {this.state.users.map(user => (
                        <ul key={user.uid}>
                            
                            
                            <li className='li-w'>
                                    <Typography variant='h6' style={{ lineHeight: 2, margin:'20px 0 0 0'}}><p> Qn: {user.tittle}</p></Typography> 
                            </li>
                            <li className='li-w'>
                                <Typography variant='p' > <strong >Created by :</strong> {user.username}</Typography>
                            </li>
                            <li className='li-w'>
                                <Typography variant='p'> <strong>Created On :</strong> {user.createdAt}</Typography>
                            </li>
                                <Divider style={{margin: '0 0 20px 0', width:'300px' ,height: '2px',}}/>
                                <li className='li-w'>
                                    <Typography variant='p' style={{textAlign:'justify'}}> <strong >Description :</strong>  {user.description}</Typography>
                                </li>
                                <li className='li-w'>
                                    <Typography variant='p'>
                                        {user.content}
                                    </Typography>
                                    <br/> 
                                </li>
                                    
                        </ul>
                    ))}
                    </div>
                    </div>
                    
                   
                </Card>
                
                
                
            </div>
        )
    }
}
export default withFirebase(withStyles(useStyles)(Problems));

