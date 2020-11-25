import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {NavLink} from 'react-router-dom';
//  import Cart from '../../../client/src/app/components/Module/Module'


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
      <AppBar 
        elevation={0} 
        position="static" 
        style={{
          backgroundColor:'lightgrey', 
          height: 'auto', 
          color:'black',
          textTransform:'lowercase',
          }}
        >
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              height: "2px",
              width: 0, 
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',              
              borderBottom: '16px solid white',
              marginLeft: '10%',
              backgroundColor: 'transparent',
            }
          }}
        >
          <Tab 
            label="General" 
            href="/general" 
            {
              ...a11yProps(0)} 
              style={{color:'black', 
              // marginTop: '15px'
            }}
          />

          <Tab 
            label="Product &amp; Services" 
            href="/product" 
            {...a11yProps(1)} 
            style={{
              color:'black', 
              // marginTop: '15px'
              }} 
          />

          <Tab 
            label="Purchase Module" 
            href="/purchase" 
            {...a11yProps(2)} 
            style={{
              color:'black', 
              // marginTop: '15px'
            }}
          />

          <Tab 
            label="Code &amp; Debug" 
            href="/code" 
            {...a11yProps(3)} 
            style={{
              color:'black', 
              // marginTop: '15px'
            }} 
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        General
      </TabPanel>

      <TabPanel value={value} index={1}>
        Product &amp; Services
      </TabPanel>

      <TabPanel value={value} index={2} >
        <NavLink to='/cart'>purchase</NavLink>
      </TabPanel>

      <TabPanel value={value}index={3}>
        Code &amp; Debug
      </TabPanel>
    </div>
  );
}
