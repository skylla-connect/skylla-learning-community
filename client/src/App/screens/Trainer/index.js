import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Menu from './components/menu';
import Permissions from './components/permissions';
import Mobile from './mob';
import Views from './components/views/views';
import ProfilePage from './screens/profilePage';
import ScheduleClass from './screens/schedule';
import Footer from '../../components/Footer/footer';
import *as ROUTES from '../../config/routes';
import Assessments from './screens/assignment/index';
import TEST from './screens/quiz/index';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
}));

// Define routes in the Trainees
const routes = [
  {
    path: ROUTES.TRAINER,
    exact: true,
    sidebar: () => <div></div>,
    main: () => <div>
       {/* Views */}
       <Views />
    </div>
  },

  {
    path: ROUTES.PROFILE,
    exact: true,
    sidebar: () => <div></div>,
    main: () => <div>
      <ProfilePage/>
    </div>
  },

  {
    path: ROUTES.INTERVIEWS,
    exact: true,
    sidebar: () => <div></div>,
    main: () => <div>
      Interviews page
    </div>
  },

  {
    path: ROUTES.ASSESSMENTS,
    exact: true,
    sidebar: () => <div></div>,
    main: () => <Assessments />
  },

  {
    path: ROUTES.TEST,
    exact: true,
    sidebar: () => <div></div>,
    main: () => <TEST />
  },

  {
    path: ROUTES.SCHEDULE,
    exact: true,
    sidebar: () => <div></div>,
    main: () => <ScheduleClass />
  },
];

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
    <Router>
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

              <div 
                  style={{
                      margin: '-2px auto 0 auto',
                      width: '90%',
                  }}>
                  <hr  style={{ 
                    backgroundColor: 'white'
                  }}/> 
              </div>

            <Button style={{
                color: 'white',
                textTransform: 'capitalize'
            }}>
              <Typography variant="h6" paragraph>
                  Module Content
              </Typography>
            </Button>

              <div 
                  style={{
                      margin: '-2px auto 0 auto',
                      width: '90%',
                  }}>
                  <hr  style={{ 
                    backgroundColor: 'white'
                  }}/> 
              </div>

              <div className={classes.paper}> 
                  <Permissions />
              </div>

              <Switch>
                {routes.map((route, index) => (
                  // You can render a <Route> in as many places
                  // as you want in your app. It will render along
                  // with any other <Route>s that also match the URL.
                  // So, a sidebar or breadcrumbs or anything else
                  // that requires you to render multiple things
                  // in multiple places at the same URL is nothing
                  // more than multiple <Route>s.
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.sidebar />}
                  />
                ))}
              </Switch>
            </Drawer>
              <main
                  className={clsx(classes.content, {
                  [classes.contentShift]: open,
                  })}
              >
                <div className={classes.drawerHeader} style={{marginTop: -50}} />
                
                <Switch>
                  {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      children={<route.main />}
                    />
                  ))}
                </Switch>


                <div style={{marginTop: 40}}>
                  <Footer />
                </div>
              </main>
        </div>

        {/* mobile */}
        <Mobile />
      </div>
    </Router>
  );
}
