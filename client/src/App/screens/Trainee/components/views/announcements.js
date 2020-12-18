import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import FirebaseContext from 'firebase'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [annts, setAnnts] = React.useState([]);
     
        
  React.useEffect( () => {
    FirebaseContext.firestore().collection("users/admin/dashboard/anouncement/anouncement")
    .get().then((querySnapshot) => {
      const tempDoc = []
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
      return setAnnts(tempDoc)
   })
  //  const fetchData = async () => {   
  //   let db = FirebaseContext.firestore().collection('users/admin/dashboard/anouncement/anouncement');
    
  //   db.onSnapshot(function(data){
  //     setAnnts([data.docs.map(doc => ({...doc.data(), id: doc.id}))]);
  //     // console.log(annts);
  //   });
  // };
  // fetchData();
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
    
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography className={classes.heading}>ANNOUNCEMENTS {annts.author}</Typography>
        </AccordionSummary>
        {annts.map((anno) => (
            <AccordionDetails key={anno.id}>                
                <Typography>
                    {anno.content}
                </Typography>
                <Typography>
                    {anno.author}
                </Typography>            
            </AccordionDetails>        
        ))}
      </Accordion>
    </div>
  );
}
