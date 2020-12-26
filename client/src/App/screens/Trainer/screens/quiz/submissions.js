import React from 'react';
import app from 'firebase/app';
import Card from '@material-ui/core/Card'
import 'firebase/firestore'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Challenges from './challenges';
import Footer from '../../../../components/Footer/footer';

const useStyles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(10),
      backgroundColor: 'transparent',
    },
    card: {
        padding: theme.spacing(5),
        width:  '80%',
        backgroundColor: 'transparent',
        margin: `${theme.spacing(1)}px auto`,
        [theme.breakpoints.down('sm')]: {
            width:'90%',
            padding: theme.spacing(2),
        },
        list:{
            margin: 30,
        }
        
    },
});
class Submissions extends React.Component{
    constructor(){
        super();
        this.state ={
            loading: false,
            users:[],
            counter:1
        };
        this.db = app.firestore()
    }
   
    componentDidMount() {
        this.setState({ loading: true });
        this.db.collection(`users/trainer/dashboard/solutions/solutions`)
        .get()
        .then(querySnapshot =>{
            const data = querySnapshot.docs.map(doc=> doc.data());
            console.log(data)
            this.setState({users:data})
        })
      } 
        
      
    render(){
        const { classes } = this.props;
        const {users , counter} = this.state;
        return(
            <div>
                <Challenges />
                <div className={classes.root}>    
                    <Card elevation={0} className={classes.card}>
                        <Typography component='ol'>
                            {users.map(user =>(
                                <Typography component='li' className={classes.list}>
                                    <div key={user.id}> 
                                    <Typography  variant='body2'>
                                        Submitted by : <em>{user.user}</em>
                                    </Typography>
                            
                                    <h4>Html</h4>
                                    {user.html}
                                
                                    <h4>Css</h4>
                                    {user.css}
                                
                                    <h4>JavaScript</h4>
                                    {user.js}
                                    <hr/>
                                    </div>
                                </Typography>
                            ))}
                        </Typography>
                    </Card>  
                </div>

                <Footer />
            </div>
        );

    }
   
}
export default withStyles(useStyles)(Submissions);