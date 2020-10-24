/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from "react";
import { Centered } from '../../components';
import * as colors from "../../styles/colors";

const SideBanner = () => {
    return ( 
    <div css={{
        width: '30%',
        height: '100vh',
        color: colors.base,
        backgroundColor: colors.blue}}>
        <Centered>
            <h1>JOIN</h1>
            <p css={{
                textAlign: 'center',
                fontSize: '26px',
                padding: '65px 50px',
        }}>the Million people
            Learning to Code
            with Skylla Connect</p>
        </Centered>
    </div>
     );
}
 
export default SideBanner;