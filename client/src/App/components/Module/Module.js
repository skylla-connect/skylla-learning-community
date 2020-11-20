import React from 'react';
import '../../components/Module/Module.css'
import Shuffle from '@material-ui/icons/Shuffle'
import FormatTextdirectionRToL from '@material-ui/icons/FormatTextdirectionRToL'
import FindReplace from '@material-ui/icons/FindReplace'
import GitHub from '@material-ui/icons/GitHub'
import Code from '@material-ui/icons/Code'
import LaptopChromebook from '@material-ui/icons/LaptopChromebook'
import PanTool from '@material-ui/icons/PanTool'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'
import Menu from '../../components/Module/Menu/Menu'
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card'


const Module =() =>{
    return(
        <div>
            <Menu />
            {/* CONTENT */}
            <div className='join'>
                <div>
                    <Link to='/'><ArrowBack /></Link>
                </div>
                <h1 className='title'>JOIN</h1>
                <p className='texts'>the million people learning to code with skylla connect</p>
            </div>
            {/* FIRST CARD */}
            {/* CARD RIGHT */}
            <div className='all'>
                <Card elevation='3' className='card1'>
                    <div className='sky'> 
                        <Shuffle />
                    </div>
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
                </Card>
                {/* CARD LEFT */}
               <Card elevation='3'className='card2'>
                    <div className='sky1' >
                        <PanTool />
                    </div>
                    <p className='p'>
                        Take a look at one of our most
                        popular computer Science 
                        fundamentals startercourse
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'>
                        Go to cart
                    </Button>
               </Card>
            </div>

            {/* SECOND CARD */}
            {/* CARD RIGHT */}
            <div className='all'>
                <Card elevation='3' className='card1'>
                    <div className='shuffler'> 
                        <Code />
                    </div>
                    <p>
                    Learn HTML | CSS & JavaScript  
                    in one week.
                    10+ videos - 10+ challenges
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'
                        id='butt1'>
                        Go to cart
                    </Button>
                </Card>
                {/* CARD LEFT */}
                <Card elevation='3' className='card2'>
                    <div className='first' >
                        <FindReplace/>
                    </div>
                    <p>
                        Learn Python in one week.videos
                        -12 challenges <br />
                        -2 articles
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'
                        id='butt1'>
                        Go to cart
                    </Button>
                </Card>
            </div>
            {/* THIRD CARD */}
            {/* CARD RIGHT */}
            <div className='all'>
                <Card elevation='3' className='card1'>
                    <div className='shuffle'> 
                        <LaptopChromebook />
                    </div>
                    <p>
                    Learn to manage different versions of your code with git.
                    10+ videos - 10+ challenges
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'
                        id='but'>
                        Go to cart
                    </Button>
                </Card>
                {/* CARD LEFT */}
                 <Card elevation='3' className='card2'>
                    <div className='sec'>
                        <GitHub />
                    </div>
                    <p>
                        Take a look at one of our most 
                        popular versions of Git starter 
                        course and feel free to read and also
                        get started
                    </p>
                    <Button
                        variant='contained'
                        color='secondary'
                        id='butt2'>
                        Go to cart
                    </Button> 
                 </Card>  
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

