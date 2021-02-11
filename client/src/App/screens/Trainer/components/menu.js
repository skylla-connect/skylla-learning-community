import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { withFirebase } from '../../../firebase';
import { Link } from 'react-router-dom';
import *as ROUTES from '../../../config/routes';

const menu = ({ firebase }) => {
  return (
    <div>
      <MenuList>
        <Link to={ROUTES.TRAINER}  style={{
          color: 'white', 
          textDecoration: 'none'
          }}>
          <MenuItem>
            <HomeIcon style={{
                color: '#CCCCCC',
                marginRight: '10px'
            }}/> Home
          </MenuItem>
        </Link>

        <Link to={ROUTES.PROFILE}  style={{
          color: 'white', 
          textDecoration: 'none'
          }}>
          <MenuItem>
            <AccountBoxIcon style={{
              color: '#D5E8D4',
              marginRight: '10px'
              }} 
            /> Profile
          </MenuItem>
        </Link>

        <Link to={ROUTES.INTERVIEWS}  style={{
          color: 'white', 
          textDecoration: 'none'
          }}>
          <MenuItem>
              <AssessmentIcon style={{
              marginRight: '10px'
              }} /> Interviews
          </MenuItem>
        </Link>
        
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

export default withFirebase(menu);
