import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import mypic1 from '../LiveSupport/Assets/mypic1.png'
import './Slider.css'
 
const slideImages = [
  'images/slide_2.jpg',
  'images/slide_3.jpg',
  'images/slide_4.jpg'
];
 
const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide >
            <div className='try'>
            <div className="slide1">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span><img src={mypic1} alt={mypic1} className='snap'/></span>
            </div>
            </div>
            <div className="slide2">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>
              <p className='pala' >When starting a live Chat please indicate the Fullname 
                            and email address associated with
                            your Namecheap account. This will help speed up our verification
                            and investigation processes
                            
                </p>
              </span>
            </div>
            </div>
            </div>
          <div className='try'>
          <div className="slide1">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span><img src={mypic1} alt={mypic1} className='snap'/></span>
            </div>
          </div>
          <div className="slide2">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>
              <p className='pala' >When starting a live Chat please indicate the Fullname 
                            and email address associated with
                            your Namecheap account. This will help speed up our verification
                            and investigation processes
                            
                </p>
              </span>
            </div>
          </div>
          </div>
 
        <div className='try'>
          <div className="slide1">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span><img src={mypic1} alt={mypic1} className='snap'/></span>
            </div>
          </div>
          <div className="slide2">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>
              <p className='pala' >When starting a live Chat please indicate the Fullname 
                            and email address associated with
                            your Namecheap account. This will help speed up our verification
                            and investigation processes
                            
                </p>
              </span>
            </div>
          </div>
          </div>
        </Slide>
      </div>
    )
}
export default Slideshow;