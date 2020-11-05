import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, 
    Divider,
    Grid,
    Paper,
    ButtonBase
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        width: '99%',
        height: 'auto',
        margin: '5% 0 0 0'
    },

    BioData: {
        padding: 20,
        flexGrow: 1
    },

    pPic: {
        width: '100%',
        borderRadius: '50%'
    },

    paper: {
        padding: theme.spacing(4),
        margin: 'auto auto auto 0',
        maxWidth: 500,
    },

    image: {
        width: 180,
        height: 180,
    },
}));

export default function ProfilePage() {
    const classes = useStyles();

  return (
    <Paper className={classes.root}>
        <div className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                        <img 
                            className={classes.pPic} 
                            src={'https://www.pngitem.com/pimgs/m/442-4426913_avatar-icon-png-white-png-download-white-person.png'} 
                            alt='Profile Pic'
                        />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h4">
                                John Doe
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Systems Administrator
                            </Typography>
                            <Typography variant="body2" gutterBottom color="textSecondary">
                                ID: 003
                            </Typography>
                            <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                jdoe@skyllaconnect.com
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* <Grid item>
                    <Typography variant="subtitle1">$19.00</Typography>
                    </Grid> */}
                </Grid>
            </Grid>
        </div>
        <Divider/>
    </Paper>
  );
}
