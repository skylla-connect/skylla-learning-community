import React from 'react'
import 'firebase/firestore'
import app from 'firebase/app'
import { withFirebase } from '../firebase';
import {Typography, List, ListItemText, ListItem} from '@material-ui/core'
// import { withFirebase } from '../../../firebase';
import {withStyles} from '@material-ui/core/styles'
import Footer from '../components/Footer/footer'


const useStyles = theme =>({
    root: {
        flexGrow:1
    },
    card:{
        padding: theme.spacing(2),
        maxWidth:'70%',
        height: '40%',
        margin: `${theme.spacing(2)}px auto`,
        // borderTop:'2px solid blue',
        borderBottom:'2px solid black',
    },
    sectionMobile:{
        pic:{
            width:'8%',
            height:'20%',
            float:'left',
            color:'white',
            marginTop:'25px',

        }
    },
});
class FinalAssess extends React.Component{
    constructor(props) {
        super(props);
     
        this.state = {
          loading: false,
          finalassessment:[],
          users:[],
          color:null
        };
        this.db  = app.firestore()
      }
     
      componentDidMount() {
        this.setState({ loading: true });
        this.db.collection(`users/admin/dashboard/finalassessment/finalassessment`)
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
        const {classes} = this.props;
        return(
            <div>
                   <div className='quizmenu'>
                    <a href="#general" > <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
                        alt='pic'
                        style={{
                        width:'10%',
                        height:'50%',
                        float:'left',
                        color:'white',
                        marginTop:'25px',
                        // className:{classes.pic}

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
                    Final Assessment
                    </Typography>
                </div>
                    <div>
                    {this.state.users.map(user=>(

                        <List className={classes.card} key={user.uid} >
                            <ListItem>
                                <ListItemText>
                                <Typography style={{color:'blue'}}>ModuleName: </Typography>  
                                 {user.modulename}
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                              <ListItemText>
                               <Typography style={{color:'blue'}}>Title: </Typography> 
                                {user.tittle}
                              </ListItemText>
                            </ListItem>

                            <ListItem>
                              <ListItemText>
                                <Typography style={{color:'blue'}}>Description: </Typography>
                                {user.description}
                              </ListItemText>
                            </ListItem>
                            
                            <ListItem>
                              <ListItemText>
                                <Typography style={{color:'blue'}}>Content:</Typography> 
                                    {user.content}
                                </ListItemText>
                            </ListItem>

                        </List>
                   
                    ))
                    }
                    </div>
                    <Footer />
            </div>
        )
    }
}
export default withFirebase(withStyles(useStyles)(FinalAssess) );
