import React from 'react'
import Footer from '../app/components/Footer/footer'
import MenuLive from '../LiveSupport/MenuLive'
import Tabs from '../LiveSupport/Tabs'
import './LiveSupport.css'
// import Radio from '@material-ui/core/Radio';
import Slider from '../LiveSupport/Slider'

class LiveSupport extends React.Component{
    render(){
        return(
            <div>
           <MenuLive/>
           <Tabs/>
         <div className='para'>
         <p>Have a general question about Skylla Products or services? You've come to the right place. Click the 'Live Support Online' button
             to connect with one our helpful support staffers or consult our  knowledge base for an answer.
          </p>
         </div>

          <div className='para'>
              <h3 style={{marginTop:'20px'}}>Relevant Articles</h3>
            <ul className='para'>
                <li>aim higher</li>
                <li>aim higher</li>
                <li>aim higher</li>
            </ul>
            </div>
            <div >
                <h3 className='para' style={{marginTop:'20px',textAlign:'center'}}>Tips and Tricks</h3>
                 <p style={{textAlign:'center'}}>How to get a reply first</p>
            
            </div>
            <Slider/>
            {/* <div className='myphoto'>
                    <div className='avat4'>
                    <img src='https://skyllaconnect.com/static/media/devops-development-cycles-automation-monitoring-all-steps-software-construction_6280-79-01-01.322b77c7.png'
                      alt='pic1'
                      className='avat3'
                      />

                    </div>
                    <div className='palla'>
                        <p className='pala' >When starting a live Chat please indicate the Fullname 
                            and email address associated with
                            your Namecheap account. This will help speed up our verification
                            and investigation processes
                            
                        </p>
                       <div className='radio'> <Radio style={{Color:'orangered'}}/>    <Radio/>   <Radio/>   <Radio/>   <Radio/> </div>  
                       
                    </div>
                   
                </div> */}
            
            <div className='para2'>
                <p style={{margin:'20px 0% 0 15%'}}>Need help? We are always here for you  <button className='butt'>Live Support</button></p>
                
            </div>
        
            <Footer />
         </div>
        )
    }
}
export default LiveSupport;

