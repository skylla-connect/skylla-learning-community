import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import MenuIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Tooltip title="Add" aria-label="add" style={{color: '#0000FF'}}>
            <Fab color="primary" className={classes.fab}>
                <AddIcon />
            </Fab>
        </Tooltip>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem  style={{ display: 'flex'}}>
            <div style={{margin: '15px auto'}} onClick={handleClose}>
                <Avatar alt="Remy Sharp" src="" />
                <Typography variant="body2">
                    Trainee
                </Typography>
            </div>

            <div style={{margin: '15px auto'}} onClick={handleClose}>
                <Avatar alt="Remy Sharp" src="" />
                <Typography variant="body2">
                  Trainer
                </Typography>
            </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
            <div style={{textAlign: 'center', display: 'flex'}}>
                <img 
                  src="https://cdn0.iconfinder.com/data/icons/business-startup-10/50/57-128.png" 
                  alt=""
                  width="20%" />
                <Typography variant="body2" style={{margin: '15px 10px 0'}}>
                  Quiz &amp; Tests 
                </Typography>
            </div>
        </MenuItem>

        <MenuItem onClick={handleClose}>
            <div style={{textAlign: 'center', display: 'flex'}}>
                <img 
                  src="https://cdn3.iconfinder.com/data/icons/brain-games/128/Quiz-Games-red.png" 
                  alt=""
                  width="20%" />
                 <Typography variant="body2" style={{margin: '15px 10px 0'}}>
                  View Sessions
                </Typography>
            </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <div style={{textAlign: 'center', display: 'flex'}}>
                <img 
                  src="https://cdn3.iconfinder.com/data/icons/UltimateGnome/128x128/apps/gnome-session-switch.png" 
                  alt=""
                  width="20%" 
                />
                <Typography variant="body2" style={{margin: '15px 10px 0'}}>
                  Join Live Class
                </Typography>
            </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <div style={{margin: '20px auto'}}>
                <Tooltip title="Cart" aria-label="Cart" style={{color: '#0000FF',}}>
                    <Fab color="primary" className={classes.fab}>
                    <AddShoppingCartIcon style={{}} />
                    </Fab>
                </Tooltip>
            </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
