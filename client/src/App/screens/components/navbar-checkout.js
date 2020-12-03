import React from 'react'
import Shoppingcart from '@material-ui/icons/ShoppingCart'
import './Menu.css'

const Menu =()=>{
    return(
        <div>
             {/* MENU SKYLLA */}
             <div className='menu1'>
                <div className='alin'>
                    <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' alt='img' className='log'/>
                    <div className='cart'>
                        <Shoppingcart />
                        <p>Cart</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;