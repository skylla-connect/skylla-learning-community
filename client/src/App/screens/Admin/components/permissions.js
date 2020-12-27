import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './permissions.css'
import { Link } from 'react-router-dom';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';

const permissions = (props) => {
  return (
    <div>
      <MenuList>
        {/* add users */}
        {/* <Link to="/add_users" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem>
            <img 
              src="https://cdn2.iconfinder.com/data/icons/humano2/128x128/actions/contact-new.png" 
              alt=""
              style={{
                  marginRight: '10px',
                  width: '15%'
                }}
              />
            add users 
          </MenuItem>
        </Link> */}

        {/* manage users */}
        <Link to="/delete_users" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem >
            <img 
                src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-02-512.png" 
                alt=""
                style={{
                    marginRight: '10px',
                    width: '15%'}}/>
            manage users
          </MenuItem>
        </Link>

        {/* Add module */}
        <Link to="/add_module" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem>
            <AddCircleIcon style={{ color: '#7ADF78', marginRight: '10px'}}/>
            add module
          </MenuItem>
        </Link>

        {/* Delete Module */}
        <Link to="/delete_module" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem>
            <i className="material-icons" 
                style={{color: '#CCCCCC', marginRight: '10px'}}>
                cancel
            </i>
            manage modules
          </MenuItem>
        </Link>

        {/* Announcement */}
        <Link to="/announcements" style={{color: 'white', textDecoration: 'none'}}>
          <MenuItem>
            <SettingsVoiceIcon style={{ color: '#7ADF78', marginRight: '10px'}}/>
            Announcements
          </MenuItem>
        </Link>
      </MenuList>
    </div>
  );
}

export default permissions;
