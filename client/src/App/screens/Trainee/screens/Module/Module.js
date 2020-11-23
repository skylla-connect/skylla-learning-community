import React from 'react';
import './Module.css'
import Menu from '../../shared/Menu/Menu'
import Footer from '../../../../components/Footer/footer';
import CodeModules from './Coding/Code';

const Module =() =>{
    return(
        <div className='moduleBody'>
            {/* Menu */}
            <Menu />

            {/* Modules page */}
            <CodeModules />

            {/* Footer */}
            <Footer />
        </div>
    )
}
export default Module;

