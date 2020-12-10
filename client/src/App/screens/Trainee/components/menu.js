import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SpeedIcon from '@material-ui/icons/Speed';
import *as ROUTES from '../../../config/routes';
import { withFirebase } from '../../../firebase';
import FirebaseContext from 'firebase';
import { Link } from 'react-router-dom';

const Menu = ({ firebase }) => {
  const [liveClassDetails, setliveClassDetails] = React.useState({module:'', session:'', link:''});

  class classDetails {
    constructor (module, session, link ) {
        this.module = module;
        this.session = session;
        this.link= link;
    }
  }

// Firestore data converter
  var classDetailsConverter = {
    toFirestore: function(classDetails) {
        return {
            module: classDetails.module,
            session: classDetails.session,
            link: classDetails.link
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        const det1 = new classDetails(data.module, data.session, data.link);
        return det1
    }
  }

  React.useEffect(() => {
    let db = FirebaseContext.firestore().collection('users/trainer/dashboard/live_class/schedule');
    let query = db.where('session', '==', 'evening');
    
    query.withConverter(classDetailsConverter).get()
    .then(snapshot => {
        if (snapshot.empty) {
        console.log('No matching documents.');
        return;
        }  

        snapshot.forEach(doc => {
            var x = doc.data();
            setliveClassDetails(x)
        // console.log(doc.id, '=>', x);
        ;
        })
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
  }, [classDetailsConverter]);

  return (
    <div>
      <MenuList>
        <Link to={ROUTES.TRAINEE}  style={{
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

        <a href={liveClassDetails.link}  style={{
          color: 'white', 
          textDecoration: 'none'
          }}>
          <MenuItem>
              <img 
              src="https://cdn3.iconfinder.com/data/icons/UltimateGnome/128x128/apps/gnome-session-switch.png" 
              alt="" 
              style={{ marginRight: '10px', width: '15%'}}
              /> Join Live Class
          </MenuItem>
        </a>

        <Link to={ROUTES.LIVE_CLASS}  style={{
          color: 'white', 
          textDecoration: 'none'
          }}>
          <MenuItem>
              <img 
              src="https://cdn0.iconfinder.com/data/icons/business-startup-10/50/57-128.png" 
              alt="" 
              style={{ marginRight: '10px', width: '15%'}}
              /> Quiz &amp; Tests 
          </MenuItem>
        </Link>

        <Link to={ROUTES.LIVE_CLASS}  style={{
          color: 'white', 
          textDecoration: 'none'
          }}>
          <MenuItem>
              <img 
              src="https://cdn3.iconfinder.com/data/icons/brain-games/128/Quiz-Games-red.png" 
              alt="" 
              style={{ marginRight: '10px', width: '15%'}}
              /> View Sessions
          </MenuItem>
        </Link>

        <Link to={ROUTES.ASSESSMENTS}  style={{
          color: 'white', 
          textDecoration: 'none'
          }}>
          <MenuItem>
            <SpeedIcon style={{
              color: '#D5E8D4',
              marginRight: '10px'
              }} /> Final Assessments
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

        <Link to={ROUTES.HIRED}  style={{
          color: 'white', 
          textDecoration: 'none'
          }}>
          <MenuItem>
              <img 
              src="https://cdn4.iconfinder.com/data/icons/pc_de_hamburg_icon_pack/32x32/hire-me.png" 
              alt="" 
              style={{ marginRight: '10px', width: '15%'}}
              /> Get Hired
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

export default withFirebase(Menu);
