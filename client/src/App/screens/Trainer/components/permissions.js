import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import Typography from '@material-ui/core/Typography';
import './permissions.css'

const permissions = (props) => {
  return (
    <div>
        {/* <Typography variant="h6" paragraph>
            Permissions
        </Typography> */}

        <MenuList>
          <MenuItem>
            <img 
              src="https://cdn0.iconfinder.com/data/icons/fatcow/32x32/session_idle_time.png" 
              alt=""
              style={{
                  marginRight: '10px',
                  width: '15%'
                }}
              />
            add sessions 
          </MenuItem>

          <MenuItem >
            <img 
                src="https://cdn3.iconfinder.com/data/icons/brain-games/128/Quiz-Games-red.png" 
                alt=""
                style={{ 
                    marginRight: '10px',
                    width: '15%'}}
                  />
            create Quizes
          </MenuItem>

          <MenuItem>
            <i style={{ 
                    marginRight: '10px',
                    width: '15%',
                    fontSize: '18px',
                    color: 'black'}} className='fas'>&#xf0c0;</i>
            supervise trainees
          </MenuItem>

          {/* <MenuItem>
            <i className="material-icons" 
                style={{color: '#CCCCCC', marginRight: '10px'}}>
                cancel
            </i>
            delete module
          </MenuItem> */}

          <MenuItem>
              <img 
              src="https://cdn0.iconfinder.com/data/icons/fatcow/32/document_mark_as_final.png" 
              alt="" 
              style={{ marginRight: '10px', width: '15%'}}
              /> create assessment
          </MenuItem>
        </MenuList>
    </div>
  );
}

export default permissions;
