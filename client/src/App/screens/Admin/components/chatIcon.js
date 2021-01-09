import React from 'react';
import Tooltip from '@material-ui/core/Tooltip'
import { Fab } from '@material-ui/core';
import Support from '@material-ui/icons/ContactSupport';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../config/routes';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },

}));

const ChatIcon = () => {
    const classes = useStyles();
    return (
        <a href={ROUTES.LIVE_SUPPORT}>
            <Tooltip title="support" aria-label="support">
                <Fab color="secondary" className={classes.absolute}>
                    <Support />
                </Fab>
            </Tooltip>
        </a>
    );
}

export default ChatIcon;