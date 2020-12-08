import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import Typography from '@material-ui/core/Typography';
import './permissions.css'
import { Link } from 'react-router-dom';
// import *as ROUTES from '../../../config/routes'

const permissions = (props) => {
  return (
    <div>
        {/* <Typography variant="h6" paragraph>
            Permissions
        </Typography> */}
        
        <MenuList>
          {/* add users */}
          <Link to="/add_users" style={{color: 'white', textDecoration: 'none'}}>
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
          </Link>

          {/* delete users */}
          <Link to="/delete_users" style={{color: 'white', textDecoration: 'none'}}>
            <MenuItem >
              <img 
                  src="https://cdn2.iconfinder.com/data/icons/aspneticons_v1.0_Nov2006/user2-delete-16x16.gif" 
                  alt=""
                  style={{
                      marginRight: '10px',
                      width: '15%'}}/>
              delete users
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
              delete module
            </MenuItem>
          </Link>

          {/* Create assesment */}
          <Link to="/assignment" style={{color: 'white', textDecoration: 'none'}}>
            <MenuItem>
                <img 
                src="https://cdn0.iconfinder.com/data/icons/fatcow/32/document_mark_as_final.png" 
                alt="" 
                style={{ marginRight: '10px', width: '15%'}}
                /> create assignment
            </MenuItem>
          </Link>
        </MenuList>
    </div>
  );
}

export default permissions;
