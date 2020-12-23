import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import FirebaseContext from 'firebase'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Footer from '../../../../components/Footer/footer';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import *as ROUTE from '../../../../config/routes';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '80%',
    padding: 20,
    backgroundColor: 'transparent',
    border: '5px solid white'
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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
  },

  fab: {
    margin: theme.spacing(2),
  },

  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(3),
    zIndex: 999
  },

  container: {
    width: '80%',
    margin: '20px auto',
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    }
  }
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
         tempDoc.push({ id: doc.id, ...doc.data() });
      })
        setAnnts(tempDoc)
        // console.log(tempDoc);
    })
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
       <Link to={ROUTE.TRAINEE}>
          <Tooltip title="Click to go back" aria-label="add">
              <Fab color="primary" className={classes.absolute}>
                  <KeyboardBackspaceIcon />
              </Fab>
          </Tooltip>
      </Link>

      <div className={
          classes.container
        }>
        <Accordion className={classes.root} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <Typography className={classes.heading}>
            ANNOUNCEMENTS
          </Typography>

          </AccordionSummary>
            {
              annts.map((anno) => (
                <div key={anno.id}>
                  <AccordionDetails >                
                    <Typography className={classes.cAnno}gutterBottom>
                        {anno.Content}
                    </Typography>
                    <Typography className={classes.tAnno} gutterBottom>
                      {new Date(anno.createdAt).toLocaleDateString("en-US")}<br></br>
                      {anno.Author}
                    </Typography>       
                  </AccordionDetails> 
              </div>     
            ))}
        </Accordion>
      </div>

      <Footer />
    </div>
  );
}
