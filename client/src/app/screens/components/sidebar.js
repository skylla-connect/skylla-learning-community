/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from "react";
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
            <h1>JOIN</h1>
            <p css={{
                fontFamily: 'Raleway-Medium',
                textAlign: 'center',
                fontSize: '24px',
                padding: '65px 70px',
                letterSpacing: '0.01rem',
                lineHeight: '2rem',
        }}>the Million people
            Learning to Code
            with Skylla Connect</p>
        </Centered>
    </div>
     );
}
 
export default SideBanner;