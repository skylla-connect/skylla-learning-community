/** @jsx jsx */
import {jsx} from '@emotion/core'


export const Footer = () => {
    return ( 
        <footer css={{
            position: 'absolute',
            bottom: '0px',
            width: 'inherit',
            height: '60px',
            // lineHeight: '20px',
            padding: '10px',
            background: 'transparent',
            color: '#6C757D',
        }}>
            <div>
                <p css={{fontSize: '14px'}}>&copy; {new Date().getFullYear()} | Skylla Co</p>
            </div>     
        </footer>
     );
}