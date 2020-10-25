import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <div>
                <Typography>
                    &copy; {new Date().getFullYear()}  | Skylla Co. 
                </Typography>
            </div> 

            <div>
                <Typography variant="body2" style={{color: '#3067e2'}}>
                    <Link to="/">Privacy Policy</Link> | <Link to="/">Terms and Conditions</Link>
                </Typography>
            </div>
        </div> 
    );
}

export default Footer;