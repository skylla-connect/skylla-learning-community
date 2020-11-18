import React from 'react';
import '../../components/Module/Module.css'
import Shoppingcart from '@material-ui/icons/ShoppingCart'
import Shuffle from '@material-ui/icons/Shuffle'
import PanTool from '@material-ui/icons/PanTool'
import Button from '@material-ui/core/Button'

const Module =() =>{
    return(
        <div>
            {/* MENU SKYLLA */}
            <div className='menu1'>
                <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' className='log'/>
                <div className='cart'>
                    <Shoppingcart />
                    <p>Cart</p>
                </div>
            </div>
            {/* CONTENT */}
            <div className='join'>
                <h1 className='title'>JOIN</h1>
                <p className='texts'>the million people learning to code with skylla connect</p>
            </div>
            {/* FIRST CARD */}
            {/* CARD RIGHT */}
            <div className='all'>
                <div className='shuffle'> 
                    <Shuffle />
                </div>
                <div className='size'>
                    <p>
                        Learn the fundamentals of computer Science
                        in one week.
                        10+videos -10+ challenges
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'>
                        Go to cart
                    </Button>
                </div>
                {/* CARD LEFT */}
                <div className='shuffle'>
                    <PanTool className='shuffle'/>
                </div>
               <div>
                    <div className='sizer'>
                        <p>Take a look at one of our most
                            popular computer Science 
                            fundamentals startercourse
                            
                        </p>
                        <Button
                            variant='contained'
                            color='secondary'>
                            Go to cart
                        </Button>
                    </div>
               </div>
            </div>

            {/* SECOND CARD */}
            {/* CARD RIGHT */}
            <div className='all'>
                <div className='shuffle'> 
                    <Shuffle />
                </div>
                <div className='size'>
                    <p>
                        Learn the fundamentals of computer Science
                        in one week.
                        10+videos -10+ challenges
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'>
                        Go to cart
                    </Button>
                </div>
                {/* CARD LEFT */}
                <div className='shuffle'>
                    <PanTool className='shuffle'/>
                </div>
               <div>
                    <div className='sizer'>
                        <p>Take a look at one of our most
                            popular computer Science 
                            fundamentals startercourse
                            
                        </p>
                        <Button
                            variant='contained'
                            color='secondary'>
                            Go to cart
                        </Button>
                    </div>
               </div>
            </div>
            {/* THIRD CARD */}
            {/* CARD RIGHT */}
            <div className='all'>
                <div className='shuffle'> 
                    <Shuffle />
                </div>
                <div className='size'>
                    <p>
                        Learn the fundamentals of computer Science
                        in one week.
                        10+videos -10+ challenges
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'>
                        Go to cart
                    </Button>
                </div>
                {/* CARD LEFT */}
                <div className='shuffle'>
                    <PanTool className='shuffle'/>
                </div>
               <div>
                    <div className='sizer'>
                        <p>Take a look at one of our most
                            popular computer Science 
                            fundamentals startercourse
                            
                        </p>
                        <Button
                            variant='contained'
                            color='secondary'>
                            Go to cart
                        </Button>
                    </div>
               </div>
            </div>

            {/* FOOTER */}
            <footer className='foot'>
               <div className='ryt'>
                    &copy;2020 Skylla Co
               </div>
            </footer>
        </div>
    )
}
export default Module;

