import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import MenuIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
      backgroundColor: 'white',
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
}));

export default function SimpleMenu() {
  const classes = useStyles();

  return (
    <div>
        <div style={{margin: 'auto', width: '80%'}}>
            <Typography variant="body2" paragraph style={{marginBottom: -40}}>
                <i className='fas' style={{marginRight: 10}}>
                    &#xf234;
                </i>Share
            </Typography>
        </div>

        <MenuList style={{display: 'flex', width: '90%'}}>
            <MenuItem>
                <Tooltip title="WhatsApp" aria-label="WhatsApp" style={{color: '#0000FF'}}>
                    <Fab color="primary" className={classes.fab}>
                        <WhatsAppIcon style={{color: '#00E676'}} />
                    </Fab>
                </Tooltip>
            </MenuItem>

            <MenuItem >
                <Tooltip title="Twitter" aria-label="Twitter" style={{color: '#0000FF'}}>
                    <Fab color="primary" className={classes.fab}>
                        <TwitterIcon style={{color: '#1DA1F2'}} />
                    </Fab>
                </Tooltip>
            </MenuItem>

            <MenuItem>
                <Tooltip title="Facebook" aria-label="Facebook" style={{color: '#0000FF'}}>
                    <Fab color="primary" className={classes.fab}>
                        <FacebookIcon style={{color: '#6294E4'}} />
                    </Fab>
                </Tooltip>
            </MenuItem>

            <MenuItem>
                <Tooltip title="GitHub" aria-label="GitHub" style={{color: '#0000FF'}}>
                    <Fab color="primary" className={classes.fab}>
                        <GitHubIcon style={{color: '#000000'}} />
                    </Fab>
                </Tooltip>
            </MenuItem>
        </MenuList>
    </div>
  );
}
