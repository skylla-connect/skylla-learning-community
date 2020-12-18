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
     
        
  React.useEffect(() => {
    let mounted = true;
    //   const fetchData = async () => {
        //   let user = FirebaseContext.auth().currentUser;   
          let db = FirebaseContext.firestore().collection('/users/admin/dashboard/anouncement/anouncement');
        //   let query = db.where('trainer', '==', user.email);

        db.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                if (mounted)
                setAnnts(doc.data);
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    //   };
    //   fetchData();
    return () => { mounted = false };
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
    {annts.map((anno) => (
      <Accordion key={anno.id} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography className={classes.heading}>ANNOUNCEMENTS {annts.author}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            
                    <Typography>
                        {anno.content}
                    </Typography>
                    <Typography>
                        {anno.author}
                    </Typography>
           
        </AccordionDetails>
      </Accordion>
       ))}
    </div>
  );
}
