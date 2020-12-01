import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import FirebaseContext from 'firebase';
import 'firebase/firestore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width: '95%',
      margin: '2% 0 0 2.5%'
    },

    title: {
        fontSize: 14,
    },

    fab: {
        margin: theme.spacing(2),
    },

    typography: {
        padding: theme.spacing(4),
    },

    typo: {
        margin: theme.spacing(1)
    }
    
}));
  
export default function ClassLink () {
    const classes = useStyles();
    const [liveClassDetails, setliveClassDetails] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const handleClose = () => {
        setOpen(false)
    }
    
        
    React.useEffect(() => {
        const fetchData = async () => {  
            let db = FirebaseContext.firestore().collection('users/admin/dashboard/module/modules');
            
            db.onSnapshot(function(data){
                setliveClassDetails(data.docs.map(doc => ({...doc.data(), id: doc.id})))
            });
        };
        fetchData();
    }, []);


  return (
    <div style={{padding:50}}>
        {liveClassDetails.map((liveclass) => (
            <div key={liveclass.id} className={classes.root}>
               <div>
                    <div style={{
                        display: 'flex'
                    }}>
                        <div>
                            <Typography variant="h5" component="h5" className={classes.typo}>
                                {liveclass.module}
                            </Typography>

                            <Typography variant="h6" component="p" className={classes.typo}>
                                {liveclass.description}
                            </Typography>

                            
                            <Typography variant="body2" component="p" className={classes.typo}>
                                {liveclass.content}
                            </Typography>
                        </div>

                        <div style={{
                            margin: 50
                        }}>
                             <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <Typography className={classes.typography}>
                                            Are you sure you want to delete this module ?
                                            <Button>
                                                Yes
                                            </Button>
                                            <Button onClick={handleClose}>
                                                No
                                            </Button>
                                        </Typography>
                                    </Paper>
                                </Fade>
                                )}
                            </Popper>

                            <Tooltip 
                                title="delete module" 
                                aria-label="delete module" 
                                style={{
                                    width: '37px',
                                    height: '20px'
                                }}
                                onClick={handleClick('top')}
                                >
                                <Fab color="secondary" className={classes.fab}>
                                    <DeleteForeverIcon />
                                </Fab>
                            </Tooltip>
                        </div>
                    </div>

                    <hr />
                </div>
            </div>
        ))}
    </div>
  );
}