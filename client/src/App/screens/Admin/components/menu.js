import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SpeedIcon from '@material-ui/icons/Speed';
import { Link } from 'react-router-dom';
import { withFirebase  } from '../../../firebase';
// import './permissions.css'

const menu = ({ firebase }) => {
  return (
    <div>
      <MenuList>
        {/* home */}
        <Link to="/admin" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem>
            <HomeIcon style={{
                color: '#CCCCCC',
                marginRight: '10px'
            }}/> Home
          </MenuItem>
        </Link>

        {/* profile */}
        <Link to="/profile" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem>
            <AccountBoxIcon style={{
              color: '#D5E8D4',
              marginRight: '10px'
              }} 
            /> Profile
          </MenuItem>
        </Link>

        {/* Final assessment */}
        <Link to="/assessment" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem>
            <SpeedIcon style={{
              color: '#D5E8D4',
              marginRight: '10px'
              }} /> Final Assessments
          </MenuItem>
        </Link>

        {/* interviews */}
        <Link to="/interviews" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem>
              <AssessmentIcon style={{
              marginRight: '10px'
              }} /> Interviews
          </MenuItem>
        </Link>

        {/* Hire */}
        <Link to="/hire" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem>
              <img 
              src="https://cdn4.iconfinder.com/data/icons/pc_de_hamburg_icon_pack/32x32/hire-me.png" 
              alt="" 
              style={{ marginRight: '10px', width: '15%'}}
              /> Hire
          </MenuItem>
        </Link>

        {/* Logout */}
        <MenuItem onClick={firebase.doSignOut}>
          <i className="fa fa-power-off" style={{
            // fontSize:'36px',
            backgroundColor: '#DF8C42',
            color: 'white',
            borderRadius: '50%',
            padding: '5px',
            marginRight: '10px'
            }}>
          </i>Logout
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default withFirebase (menu);
