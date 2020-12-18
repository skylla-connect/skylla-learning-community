import React from 'react'
import 'firebase/firestore'
import app from 'firebase/app'
import { withFirebase } from '../../../firebase';
import {
    Typography, 
    Divider
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme =>({
    root: {
        flexGrow: 1,
        maxWidth:'80%',
        margin: 'auto'
    },
    card:{
        padding: theme.spacing(2),
        margin: `${theme.spacing(5)}px auto`,
    },
    mod: {
        padding: theme.spacing(1),
    }
});
class Anouncements extends React.Component{
    constructor(props) {
        super(props);
     
        this.state = {
          loading: false,
          anouncement:[],
          color:null
        };
        this.db  = app.firestore()
      }
     
      componentDidMount() {
        this.setState({ loading: true });
        this.db.collection(`users/admin/dashboard/anouncement/anouncement`)
        .get()
        .then(querySnapshot =>{
            const data = querySnapshot.docs.map(doc=> doc.data());
            console.log(data)
            this.setState({anouncement:data})
        })
      }
      radioHandler = (e) =>{
         this.setState({
             color :  e.target.value
         })
      }
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <Typography variant="body1" paragraph style={{
                    margin: '80px 80px 60px 80px',
                    textAlign: 'center'
                    }}>
                    Announcements
                </Typography>

                <Divider />

                <Typography component="ol">
                    {this.state.anouncement.map(user=>(
                   
                        <Typography component="li" key={user.uid} className={classes.card}>
                            <div className={classes.mod}>
                                <Typography style={{color:'blue'}}>
                                     Author
                                </Typography>  
                                {user.Author}
                            </div>

                            <div className={classes.mod}>
                                <Typography style={{color:'blue'}}>
                                    Content
                                </Typography>  
                                {user.Content}
                            </div>

                            <div className={classes.mod}>
                                <Typography style={{color:'blue'}}>
                                    Created On
                                </Typography>  
                                {user.createdAt}
                            </div>
                        </Typography>
                    ))}
                </Typography>
            </div>
        )
    }
}
export default withFirebase(withStyles(useStyles)(Anouncements) );
