import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FirebaseContext from 'firebase';
import 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '35%',
      height: 500,
      margin: '2% 0 0 2.5%',
      overflowY:'auto'
    },

    title: {
        fontSize: 14,
    },

    active: {
      backgroundColor: 'green',
      width: 10,
      height: 10,
      float: 'right',
      marginTop: '5%',
      borderRadius: '50%',
      animationName: '$active',
      animationDuration: '1s',
      animationTimingFunction: 'linear',
      animationIterationCount:'infinite',
    },

    '@keyframes active': {
      from: {opacity: 1},
      to: {opacity: 0}
    }
    
}));
  
export default function ClassLink () {
    const classes = useStyles();
    const [liveClassDetails, setliveClassDetails] = React.useState([]);
     
        
    React.useEffect(() => {
        const fetchData = async () => {
            // let user = FirebaseContext.auth().currentUser;   
            let db = FirebaseContext.firestore().collection('users/admin/dashboard/module/modules');
            
            db.onSnapshot(function(data){
                setliveClassDetails(data.docs.map(doc => ({...doc.data(), id: doc.id})))
            });
        };
        fetchData();
    }, []);


  return (
    <div style={{paddingTop:50, display: 'flex',}}>    
    <Card className={classes.root}>
      <Typography 
        variant="h5" 
        component="h2" 
        align='center'
        style={{
          width: '23%',
          position: 'fixed', 
          backgroundColor: 'whitesmoke',
        }}
      >
          Pending Classes
      </Typography>
    {liveClassDetails.map((liveclass) => (
      <div key={liveclass.id} style={{paddingTop:20}}>
      <CardContent>
        <Typography variant="h6" component="h2">
            {liveclass.module}
        </Typography>
        <Typography variant="body2" component="p">
          {liveclass.description}
        </Typography>
        <Typography variant="body2" component="p">
          {liveclass.content}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small"><a href={liveclass.link}>JOIN</a></Button>
      </CardActions> */}
      </div>
    ))}
    </Card>

    <Card className={classes.root}>
    <Typography 
        variant="h5" 
        component="h2" 
        align='center'
        style={{
          width: '23%',
          position: 'fixed', 
          backgroundColor: 'whitesmoke',
        }}
      >
          Ongoing Classes
      </Typography>
    {liveClassDetails.map((liveclass) => (
      <div key={liveclass.id} style={{paddingTop:20}}>
      <CardContent>
        <Typography variant="h6" component="h2">
            {liveclass.module} <div className={classes.active}/>
        </Typography>
        <Typography variant="body2" component="p">
          {liveclass.description}
        </Typography>
        <Typography variant="body2" component="p">
          {liveclass.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><a href={liveclass.link}>JOIN</a></Button>
      </CardActions>
      </div>
    ))}
    </Card>

    <Card className={classes.root}>
    <Typography 
        variant="h5" 
        component="h2" 
        align='center'
        style={{
          width: '23%',
          position: 'fixed', 
          backgroundColor: 'whitesmoke',
        }}
      >
          Completed Classes
      </Typography>
    {liveClassDetails.map((liveclass) => (
      <div key={liveclass.id} style={{paddingTop:20}}>
      <CardContent style={{color: 'grey'}}>
        <Typography variant="h6" component="h2">
            {liveclass.module}
        </Typography>
        <Typography variant="body2" component="p">
          {liveclass.description}
        </Typography>
        <Typography variant="body2" component="p">
          {liveclass.content}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small"><a href={liveclass.link}>JOIN</a></Button>
      </CardActions> */}
      </div>
    ))}
    </Card>
    </div>
  );
}