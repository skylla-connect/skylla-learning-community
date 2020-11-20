// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// // import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

// const useStyles = makeStyles({
//   roots: {
//     flexGrow: 1,
//     textDecoration:'none',
//     textTransform:'lowercase',
//     textDecorationLine:'none',
//     textBorded:'none',
//     borderTop:'none',
//     borderRight:'none',
//     borderLeft:'none',
//     backgroundColor:'yellow'
//   },
// });

// export default function CenteredTabs() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className="topnav">
//       <Tabs
//        className={classes.roots}
//         value={value}
//         onChange={handleChange}
//         indicatorColor="primary"
//         textColor="primary"
//         borderText='none'
//         textDecoration='none'
//         centered
//       >
//         <Tab label="General" style={{border:'none'}}/>
//         <Tab label="Product & Services" style={{border:'none'}}/>
//         <Tab label="Purchase module" style={{border:'none'}}/>
//         <Tab label="Code & Debug" style={{border:'none'}}/>
        
//       </Tabs>
//     </div>
//   );
// }

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      backgroundColor='#ddd'
      color='white'
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#ddd' ,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.roots}>
      <AppBar position="static" style={{backgroundColor:'lightgrey', height: '90px', marginTop: '30px',color:'black',textTransform:'lowercase',}}>
        <Tabs
          variant="fullWidth"
          backgroundColor='#ddd'
          value={value}
          onChange={handleChange}
        //   aria-label="nav tabs example"
        >
          <LinkTab label="General" href="/general" {...a11yProps(0)} style={{color:'black', marginTop: '15px'}}/>
          <LinkTab label="Product & Services" href="/product" {...a11yProps(1)} style={{color:'black', marginTop: '15px'}} />
          <LinkTab label="Purchase Module" href="/purchase" {...a11yProps(2)} style={{color:'black', marginTop: '15px'}}/>
          <LinkTab label="Code & Debug" href="/code" {...a11yProps(3)} style={{color:'black', marginTop: '15px'}} />
        </Tabs>
      </AppBar>
      <TabPanel value={value}  >
        General
      </TabPanel>
      <TabPanel value={value}  >
      Product & Services
      </TabPanel>
      <TabPanel value={value}  >
      Purchase Module
      </TabPanel>
      <TabPanel value={value} >
      Code & Debug
      </TabPanel>
    </div>
  );
}
