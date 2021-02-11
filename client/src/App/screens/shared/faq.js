import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import *as ROUTES from '../../config/routes';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    Container: {
        // padding: 20,
        backgroundColor: 'white'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '40%'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo:{
    width:'18%',
    [theme.breakpoints.down('sm')]:{
      width:'20%'
    }
  },
  link: {
      margin: 20
  }
}));

const MenuItemLists = () => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        Product &amp; Services
      </MenuItem>

      <MenuItem>
        <Link to={ROUTES.FAQ}>
            FAQ
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{
          backgroundColor: '#0000FF'
      }}>
        <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
                <Link to='/' style={{color: 'white', textDecoration: 'none'}}>
                    <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
                        className={classes.logo}
                        alt='pic'
                    />
                </Link>
            </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography variant="Container1" className={classes.link}>
                Product &amp; Services
            </Typography>
            <Typography variant="Container1" className={classes.link}>
                <Link to={ROUTES.FAQ} style={{color: 'white', textDecoration: 'none'}}>
                    FAQ
                </Link>
            </Typography>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

export default function FAQ() {
    const classes = useStyles();
    return (
        <div style={{
            backgroundColor: 'white',
            paddingTop: 20,
            margin: 'auto'
        }}>
            <MenuItemLists />
            <div className={classes.container}>
               {/*  */}
            </div>
        </div>
    );
}
