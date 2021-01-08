import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Menu from './components/menu';
import Permissions from './components/permissions';
import Views from './components/views/views';
import Footer from '../../components/Footer/footer';
import withAuthorization from '../../session/withAuthorization';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: '#0000FF',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#0000FF',
    color: 'white'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    marginTop: '-60px',
    justifyContent: 'flex-end',
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const notifyAdmin = (title, body) => {
    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification(title, {
        icon: '',
        body: body,
      });
      notification.onclick = function() {
        props.history.push(`/livechat/${body}/admin`)
        // this.cancel()
      }
    }
  }
  React.useEffect(() => {
    props.firebase.listenerNotify()
    .then(snapshot => {
      snapshot.docs.map(doc => {
        return notifyAdmin(doc.data().title, doc.data().roomId)
      })
    })
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerToggle} style={{color: 'white'}}>
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
          color: 'white',
          width: '90%',
          margin: 'auto',
        }}
      />

      <div className={classes.paper} style={{marginTop: '40px'}}> 
        <Permissions />
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
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
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}  style={{marginTop: -50}} />
        <Views />

        <div style={{marginTop: 40}}>
          <Footer />
        </div>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const condition = authUser => 
  authUser && authUser.ROLE === "admin";

export default compose(
  withRouter,
  withFirebase,
  withAuthorization(condition)
)(ResponsiveDrawer);
