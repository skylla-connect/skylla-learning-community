import React from 'react'
import Footer from '../app/components/Footer/footer'
import MenuLive from '../LiveSupport/MenuLive'
import './LiveSupport.css'
import Radio from '@material-ui/core/Radio';




class LiveSupport extends React.Component{
    render(){
        return(
            <div>
           <MenuLive/>
           <div className="topnav" >
                <a href="#general" className="active">General</a>
                <a href="#product">Product & Services</a>
                <a href="#purchase">Purchase module</a>
                <a href="#code">Code & Debug</a>
                <a href="javascript:void(0);" class="icon" onclick="myFunction()">
                   <i class="fa fa-bars"></i>
                </a>
         </div>
           {/* <div className='alls' >
            <ul className='all' >
                <li className='rog'> General </li>
                <li className='rog'> Product & Service</li>
                <li className='rog'> Purchase module</li>
                <li className='rog'> Code & Debug </li>
            </ul>
          
         </div> */}
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
                <h3 className='para' style={{marginTop:'20px'}}>Tips and Tricks</h3>
                 <p className='para'>How to get a reply first</p>
            
            </div>
            <div className='myphoto'>
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
                       <div className='radio'><Radio style={{Color:'orangered'}}/>    <Radio/>   <Radio/>   <Radio/>   <Radio/> </div>  
                    </div>
                </div>
             
              
               

            
            <div className='para2'>
                <p style={{margin:'20px 0% 0 15%'}}>Need help? We are always here for you  <button className='butt'>Live Support</button></p>
                
            </div>
        
            <Footer />
         </div>
        )
    }
}
export default LiveSupport;



// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
// import Radio from '@material-ui/core/Radio';

// const GreenRadio = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Radio color="default" {...props} />);

// export default function RadioButtons() {
//   const [selectedValue, setSelectedValue] = React.useState('a');

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   return (
//     <div>
//       <Radio
//         checked={selectedValue === 'a'}
//         onChange={handleChange}
//         value="a"
//         name="radio-button-demo"
//         inputProps={{ 'aria-label': 'A' }}
//       />
//       <Radio
//         checked={selectedValue === 'b'}
//         onChange={handleChange}
//         value="b"
//         name="radio-button-demo"
//         inputProps={{ 'aria-label': 'B' }}
//       />
//       <GreenRadio
//         checked={selectedValue === 'c'}
//         onChange={handleChange}
//         value="c"
//         name="radio-button-demo"
//         inputProps={{ 'aria-label': 'C' }}
//       />
//       <Radio
//         checked={selectedValue === 'd'}
//         onChange={handleChange}
//         value="d"
//         color="default"
//         name="radio-button-demo"
//         inputProps={{ 'aria-label': 'D' }}
//       />
//       <Radio
//         checked={selectedValue === 'e'}
//         onChange={handleChange}
//         value="e"
//         color="default"
//         name="radio-button-demo"
//         inputProps={{ 'aria-label': 'E' }}
//         size="small"
//       />
//     </div>
//   );
// }