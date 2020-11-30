import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import './permissions.css'
// import *as ROUTES from '../../../config/routes'
import { Link } from 'react-router-dom';

const permissions = (props) => {
  return (
    <div>
        <Typography variant="h6" paragraph>
            Module Content
        </Typography>

        <MenuList>
          <MenuItem>
            Title
          </MenuItem>

          <MenuItem ></MenuItem>

          <MenuItem></MenuItem>

          <MenuItem></MenuItem>

          <MenuItem></MenuItem>
        </MenuList>
    </div>
  );
}

export default permissions;
