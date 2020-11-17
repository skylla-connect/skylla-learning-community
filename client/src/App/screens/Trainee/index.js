import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Footer from '../../components/Footer/footer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Menu from './components/menu';
import Permissions from './components/moduleContent';
import Mobile from './mob';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Views from './components/views/views'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SocialIcons from './components/social';
import *as ROUTES from '../../config/routes';
import {Link} from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  desktop: {
    
  },
  appBar: {
    backgroundColor: '#0000FF',
    boxShadow: 'none',
    borderLeft: '1px solid white',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#0000FF',
    color: 'white',
  },
  paper: {
    margin: 'auto',
    width: '80%'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  fab: {
    margin: theme.spacing(0),
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <div style={{margin: 'auto'}}>
                <Typography noWrap>
                    SKYLLA LEARNING COMMUNITY
                </Typography>
              </div>
              <div style={{textAlign: 'center'}}>
                <Avatar alt="Remy Sharp" src="" />
                <Typography variant="body2">
                  Trainee
                </Typography>
              </div>

              <div style={{textAlign: 'center', margin: 15}}>
                <Avatar alt="Remy Sharp" src="" />
                <Typography variant="body2">
                  Trainer
                </Typography>
              </div>

              <div style={{textAlign: 'center'}}>
                <img 
                  src="https://cdn0.iconfinder.com/data/icons/business-startup-10/50/57-128.png" 
                  alt=""
                  width="20%" />
                <Typography variant="body2">
                  Quiz &amp; Tests 
                </Typography>
              </div>

              <div style={{textAlign: 'center'}}>
                <img 
                  src="https://cdn3.iconfinder.com/data/icons/brain-games/128/Quiz-Games-red.png" 
                  alt=""
                  width="20%" />
                 <Typography variant="body2">
                  View Sessions
                </Typography>
              </div>

              <div style={{textAlign: 'center'}}>
                <img 
                  src="https://cdn3.iconfinder.com/data/icons/UltimateGnome/128x128/apps/gnome-session-switch.png" 
                  alt=""
                  width="20%" 
                />
                <Typography variant="body2">
                  Join Live Class
                </Typography>
              </div>

              <div style={{textAlign: 'center'}}>
                  <Tooltip title="Cart" aria-label="Cart" style={{color: '#0000FF',}}>
                      <Fab color="primary" className={classes.fab}>
                        <Link to={ROUTES.CART}><AddShoppingCartIcon style={{}} /></Link>
                      </Fab>
                  </Tooltip>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader} open={open}>
              <IconButton onClick={handleDrawerClose} style={{color: 'white'}}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
            <div className={classes.paper}>
              <Menu />
            </div>

            <Divider 
              style={{
                backgroundColor: 'white',
                width: '90%',
                margin: 'auto',
              }}
            />

            <div className={classes.paper}> 
              <Permissions />
            </div>

            <Divider 
              style={{
                backgroundColor: 'white',
                width: '90%',
                margin: 'auto',
              }}
            />

            <div className={classes.paper}> 
              <SocialIcons />
            </div>
            
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} style={{marginTop: -50}} />
            {/* Views */}
            <Views />

            <div style={{marginTop: 40}}>
              <Footer />
            </div>
          </main>
      </div>

      {/* mobile */}
      <Mobile />
    </div>
  );
}
