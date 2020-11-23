import React from 'react';
import './Module.css'
import Menu from './Menu/Menu'
import Footer from '../../../../components/Footer/footer';
import CodeModules from './Coding/Code';

const Module =() =>{
    return(
        <div className='moduleBody'>
            <Menu />
            <CodeModules />
            <div style={{
                padding: 40
            }}>
                <Footer />
            </div>
        </div>
    )
}
export default Module;

