/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/core'
import { Typography } from '@material-ui/core';

// import React from "react";
import { Centered } from '../../components';
import * as colors from "../../styles/colors";

const SideBanner = () => {
    return ( 
    <div css={{
        fontFamily: 'RobotoCondensed',
        width: '30%',
        height: '100vh',
        color: colors.base,
        backgroundColor: colors.blue}}>
        <Centered>
            <Typography variant="h5" style={{
                fontFamily: 'Times New Roman', 
                fontWeight: 'bold',
                letterSpacing: '0.1rem',
                }}>
                JOIN
            </Typography>
            <Typography variant="h6" paragraph style={{
                fontFamily: 'Raleway',
                textAlign: 'center',
                // fontSize: '24px',
                padding: '65px 70px',
                letterSpacing: '0.01rem',
                lineHeight: '2rem',
        }}>the Million people
            Learning to Code
            with Skylla Connect</Typography>
        </Centered>
    </div>
     );
}
 
export default SideBanner;