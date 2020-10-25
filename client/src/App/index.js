import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom';

// import { createBrowserHistory as history} from 'history';

import './index.css';
// Material UI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Footer from './components/Footer/footer';
import Admin_Dashboard from './screens/Admin/index';
import Trainer_Dashboard from './screens/Trainer/index';

const THEME = createMuiTheme({
  typography: {
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontStyle": 'normal'
  },

  MuiButtonBase: {
    // The properties to apply
    disableRipple: true, // No more ripple, on the whole application 💣!
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

  container: {
    width: '100%',
    maxWidth: 500,
  },
}));


function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

// Let's declare all our routes that we are to use
const routes = [
  {
    path: '/admin',
    component: Admin_Dashboard,
  }, 

  {
    path: '/trainer',
    component: Trainer_Dashboard,
  }, 
];

const App = (props) => {
  const wrapper = React.createRef();
  const routeComponents = routes.map(({path, component}, key) => 
    <Route exact path={path} component={component} key={key}  />);
  return (
    <MuiThemeProvider theme={THEME}>
      <Router>
        <div>
          <Toolbar id="back-to-top-anchor" />
            <div className="page">
              <Switch>
                {routeComponents}
              </Switch>
            </div> 
            {/* ChatToolTip */}
          </div>

           {/* footer */}
          <footer>
            <Footer />
          </footer>
        </Router>

      <ScrollTop {...props}>
        <Fab 
          ref={wrapper}
          style={{
            backgroundColor: '#3067e2',
            color: 'white'
          }} 
          size="small" 
          title="scroll back to top"
          aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </MuiThemeProvider>
  );
}

export default App;
