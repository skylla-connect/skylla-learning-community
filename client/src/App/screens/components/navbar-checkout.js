/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/core';

import React from "react";
import { Link } from "react-router-dom";
import * as colors from "../../styles/colors";
// MUI stuff
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';

const Navbar = (props) => {
    return ( 
        <Card className="navbar navbar-default" css={{
            margin: "0 auto",
            backgroundColor: colors.gray,
            borderRadius: '7px',
            width: '95vw',
            height: '10vh'
        }} >
             <ul className="nav navbar-nav container" css={{
                 display: 'flex',
                 flexDirection: 'row',
             }}>
                <li>
                    <Link exact to="/" 
                    activeStyle={{ color: colors.blue}} 
                    css={{
                        color: colors.blue,
                        fontSize: "22px",
                        letterSpacing: '0.15rem'
                    }} >
                        <span></span>
                        &nbsp;Skylla
                    </Link>
                </li>
                <li>
                    <Tooltip title="Cart" aria-label="Cart" style={{color: '#0000FF',}}>
                        <AddShoppingCartIcon style={{color: colors.gray}} />
                    </Tooltip>
                </li>
             </ul>
        </Card>
     );
}
 
export default Navbar;