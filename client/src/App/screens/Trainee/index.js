import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
import ProfilePage from './screens/profilePage';
import LiveClass from './screens/liveClass';
import *as ROUTES from '../../config/routes';
import FirebaseContext from 'firebase';
import 'firebase/firestore';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
    overflow: 'hidden'
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
}));

// Define routes in the Trainees
const routes = [
  {
    path: ROUTES.TRAINEE,
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
    path: ROUTES.ASSESSMENTS,
    exact: true,
    sidebar: () => <div></div>,
    main: () => <div>
      Final Assessments page
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
    path: ROUTES.HIRED,
    exact: true,
    sidebar: () => <div></div>,
    main: () => <div>
      Hire page
    </div>
  },

  {
    path: ROUTES.LIVE_CLASS,
    exact: true,
    sidebar: () => <div></div>,
    main: () => <div>
      <LiveClass/>
    </div>
  },
];

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [currentUserDetails, setcurrentUserDetails] = React.useState({name:'', email:'', password:'', photo: ''})
  const [liveClassDetails, setliveClassDetails] = React.useState({module:'', session:'', link:''});

  class classDetails {
    constructor (module, session, link ) {
        this.module = module;
        this.session = session;
        this.link= link;
    }
    // toString() {
    //     return this.name + ', ' + this.email + ', ' + this.password;
    // }
  }
  
  class userDetails {
    constructor (name, email, password, photo ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.photo= photo;
    }
    // toString() {
    //     return this.name + ', ' + this.email + ', ' + this.password;
    // }
  }

// Firestore data converter
  var userDetailsConverter = {
      toFirestore: function(userDetails) {
          return {
              name: userDetails.name,
              email: userDetails.email,
              password: userDetails.password,
              photo: userDetails.photo
              }
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          const det1 = new userDetails(data.name, data.email, data.password, data.photo);
          return det1
      }
  }

  var classDetailsConverter = {
    toFirestore: function(classDetails) {
        return {
            module: classDetails.module,
            session: classDetails.session,
            link: userDetails.link
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        const det1 = new classDetails(data.module, data.session, data.link);
        return det1
    }
}
  React.useEffect(() => {
        let user = FirebaseContext.auth().currentUser;   
        let db = FirebaseContext.firestore().collection('users/trainee/users');
        let query = db.where('userId', '==', user.uid);
        
        query.withConverter(userDetailsConverter).get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  

            snapshot.forEach(doc => {
                var x = doc.data();
                setcurrentUserDetails(x)
            // console.log(doc.id, '=>', x);
            ;
            })
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
  }, []);

  React.useEffect(() => {
    let db = FirebaseContext.firestore().collection('users/trainer/dashboard/live_class/schedule');
    let query = db.where('session', '==', 'evening');
    
    query.withConverter(classDetailsConverter).get()
    .then(snapshot => {
        if (snapshot.empty) {
        console.log('No matching documents.');
        return;
        }  

        snapshot.forEach(doc => {
            var x = doc.data();
            setliveClassDetails(x)
        // console.log(doc.id, '=>', x);
        ;
        })
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
  }, [classDetailsConverter]);

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
                <Avatar alt="Remy Sharp" style={{marginLeft:'27%'}} src={currentUserDetails.photo} />
                <Typography variant="body2">
                  <b>{currentUserDetails.name}</b>
                </Typography>
              </div>

              <div style={{textAlign: 'center', margin: 15}}>
                <Avatar alt="Remy Sharp" src="" />
                <Typography variant="body2">
                  Trainer
                </Typography>
              </div>

              <div style={{textAlign: 'center'}}>
                <a href={liveClassDetails.link}>
                  <img 
                    src="https://cdn3.iconfinder.com/data/icons/UltimateGnome/128x128/apps/gnome-session-switch.png" 
                    alt=""
                    width="20%" 
                  />
                  <Typography variant="body2" >
                    Join Live Class
                  </Typography>
                </a>
              </div>

              <div style={{textAlign: 'center'}}>
                <Link to={ROUTES.MODULES}>
                  <Tooltip title="Cart" aria-label="Cart" style={{color: '#0000FF',}}>
                      <Fab color="primary" className={classes.fab}>
                        <AddShoppingCartIcon style={{}} />
                      </Fab>
                  </Tooltip>
                </Link>
              </div>
              
            </Toolbar>
          </AppBar>

          <Router>
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
        </Router>
      </div>

      {/* mobile */}
      <Mobile />
    </div>
  );
}