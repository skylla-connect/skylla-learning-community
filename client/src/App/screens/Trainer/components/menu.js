import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssessmentIcon from '@material-ui/icons/Assessment';

const menu = (props) => {
  return (
    <div>
      <MenuList>
          <MenuItem>
            <HomeIcon style={{
                color: '#CCCCCC',
                marginRight: '10px'
            }}/> Home
          </MenuItem>

          <MenuItem>
            <AccountBoxIcon style={{
              color: '#D5E8D4',
              marginRight: '10px'
              }} 
            /> Profile
          </MenuItem>

          <MenuItem>
              <AssessmentIcon style={{
              marginRight: '10px'
              }} /> Interviews
          </MenuItem>

          <MenuItem>
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

export default menu;
