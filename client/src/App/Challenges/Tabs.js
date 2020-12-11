import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom'
import app from 'firebase/app'
import Submissions from './Submissions';
import Problems from './Problems';


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
        <Box p={2}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#ddd' ,
  },


tab: {
  '&:focus':{outline: 'none '},
  width:500 ,
}
}));

export default function NavTab() {
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
          margin:"auto",
          color:'black',
          width:'40%',
          textTransform:'lowercase',
          }}
        >
        <Tabs
        //   variant="fullWidth"
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              height: "2px",
              width: 0, 
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',              
              borderBottom: '16px solid white',
              marginLeft: '20%',
              backgroundColor: 'transparent',
              
            }
          }}
        >
          <Tab 
            className={classes.tab}
            label="Problem" 
            {
              ...a11yProps(0)} 
              style={{color:'black', 
              border: 'none',
             
            }}
          />

          <Tab 
            className={classes.tab}
            label="Submissions" 
            {...a11yProps(1)} 
            style={{
              color:'black',
              }} 
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
              <Problems />
        
      </TabPanel>

      <TabPanel value={value} index={1}>
          <Submissions />
        
      </TabPanel>
    </div>
  );
}