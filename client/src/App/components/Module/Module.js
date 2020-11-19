import React from 'react';
import '../../components/Module/Module.css'
import Shuffle from '@material-ui/icons/Shuffle'
import FormatTextdirectionRToL from '@material-ui/icons/FormatTextdirectionRToL'
import FindReplace from '@material-ui/icons/FindReplace'
import GitHub from '@material-ui/icons/GitHub'
import Code from '@material-ui/icons/Code'
import LaptopChromebook from '@material-ui/icons/LaptopChromebook'
import PanTool from '@material-ui/icons/PanTool'
import Button from '@material-ui/core/Button'
import Menu from '../../components/Module/Menu/Menu'
import { Link } from 'react-router-dom';


const Module =() =>{
    return(
        <div>
            <Menu />
            {/* CONTENT */}
            <div className='join'>
                <div>
                    <Link to='/'><FormatTextdirectionRToL /></Link>
                </div>
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
                        <p style={{width:'80%'}}>
                            Take a look at one of our most
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
            <div className='all1'>
                <div className='shuffler'> 
                    <Code />
                </div>
                <div className='size2'>
                    <p>
                    Learn HTML | CSS & JavaScript  
                    in one week.
                    10+ videos - 10+ challenges
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'>
                        Go to cart
                    </Button>
                </div>
                {/* CARD LEFT */}
                <div className='shuffler' >
                    <FindReplace/>
                </div>
               <div>
                    <div className='size1'>
                        <p>
                            Learn Python in one week.videos
                            -12 challenges 
                            -2 articles
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
            <div className='all2'>
                <div className='shuffle'> 
                    <LaptopChromebook />
                </div>
                <div className='size'>
                    <p>
                    Learn to manage different versions of your code with git.
                    10+ videos - 10+ challenges
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'>
                        Go to cart
                    </Button>
                </div>
                {/* CARD LEFT */}
                <div className='shuffle'>
                    <GitHub />
                </div>
               <div>
                    <div className='sizer'>
                        <p>
                            Take a look at one of our most 
                            popular versions of Git starter 
                            course
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

