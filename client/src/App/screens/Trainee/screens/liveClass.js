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
      display: 'flex',
      width: '95%',
      margin: '5% 0 0 2.5%'
    },

    title: {
        fontSize: 14,
    },
    
}));
  
export default function ClassLink () {
    const classes = useStyles();
    const [liveClassDetails, setliveClassDetails] = React.useState([]);
     
        
    React.useEffect(() => {
        const fetchData = async () => {
            let user = FirebaseContext.auth().currentUser;   
            let db = FirebaseContext.firestore().collection('users/admin/dashboard/module/modules');
            
            db.onSnapshot(function(data){
                setliveClassDetails(data.docs.map(doc => ({...doc.data(), id: doc.id})))
            });
        };
        fetchData();
    }, []);


  return (
    <div>
    {liveClassDetails.map((liveclass) => (
    <Card key={liveclass.id} className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
            {liveclass.module}
        </Typography>
        <Typography variant="body2" component="p">
          {liveclass.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><a href={liveclass.link}>JOIN</a></Button>
      </CardActions>
    </Card>
    ))}
    </div>
  );
}