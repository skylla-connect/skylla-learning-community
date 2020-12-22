import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Bell from '@material-ui/icons/Notifications';
import FirebaseContext from 'firebase'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 20
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
  },

  tAnno: {
      fontSize: '90%',
      position: 'absolute',
      marginTop: 20,
      float: 'left',
      color: 'grey'
  },

  cAnno: {
      marginBottom: 20,
  }
}));

export default function SimpleAccordion() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');
  const [annts, setAnnts] = React.useState([]);
  const [count, setCount] = React.useState([]);
  const [isNew, setIsNew] = React.useState('');
  // const currentDate = ;
     
        
  React.useEffect( () => {
    // FirebaseContext.firestore().collection("users/admin/dashboard/anouncement/anouncement")
    // .get().then((querySnapshot) => {
    //   const tempDoc = []
    //   querySnapshot.forEach((doc) => {
    //      tempDoc.push({ id: doc.id, ...doc.data() });
    //   })
    //     setAnnts(tempDoc);
    //     setCount(querySnapshot.size);
        
    //     // console.log(tempDoc);
    // })

    const fetchNew = () => {
      let db = FirebaseContext.firestore().collection("users/admin/dashboard/anouncement/anouncement");
      let query = db.where('Date', '==', new Date());
      db.get().then((querySnapshot) => {
        const temDoc = []
        querySnapshot.forEach((doc) => {
          temDoc.push({ id: doc.id, ...doc.data() });
        })
        setAnnts(temDoc);
        setIsNew('New');
        setCount(querySnapshot.size);
        // console.log(tempDoc);
    })
    }

    fetchNew();
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div >
      <Accordion className={classes.root} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
          <Badge badgeContent={count} color="primary">
            <Typography className={classes.heading}>ANNOUNCEMENTS</Typography>
          </Badge>
        </AccordionSummary>
            {annts.map((anno) => (
              <div key={anno.id}>
                <Badge badgeContent={isNew} color='secondary'/>
                <AccordionDetails >                
                  <Typography className={classes.cAnno}gutterBottom>
                    {anno.Content}
                  </Typography>
                  <Typography className={classes.tAnno} gutterBottom>
                      {new Date(anno.createdAt).toDateString('en-US')}<br></br>
                      {anno.Author}
                  </Typography>       
                </AccordionDetails> 
              </div>     
            ))}{annts.length === 0 && (
                <div style={{color: 'red'}}>
                  <Bell style={{color: 'grey'}}/>All cleared Up! There are no Announcements
                </div>
              )}
      </Accordion>
    </div>
  );
}
