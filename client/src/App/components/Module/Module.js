import React from 'react';
import '../../components/Module/Module.css'
import Shuffle from '@material-ui/icons/Shuffle'
import LayersClear from '@material-ui/icons/LayersClear'
import FindReplace from '@material-ui/icons/FindReplace'
import CompareArrows from '@material-ui/icons/CompareArrows'
import LaptopChromebook from '@material-ui/icons/LaptopChromebook'
import PanTool from '@material-ui/icons/PanTool'
import Button from '@material-ui/core/Button'
import Menu from '../../components/Module/Menu/Menu'

const Module =() =>{
    return(
        <div>
            <Menu />
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
                    <PanTool />
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
                    <LayersClear />
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
                    <FindReplace/>
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
                    <LaptopChromebook />
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
                    <CompareArrows />
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

