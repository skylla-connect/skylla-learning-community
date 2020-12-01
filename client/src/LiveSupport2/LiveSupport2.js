import React from 'react'
import './LiveSupport2.css'
import { Typography, Select, FormControl, Checkbox, Button} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Footer from '../app/components/Footer/footer'
import {Link} from 'react-router-dom'


class LiveSupport2 extends React.Component{
    state={
        FullName:'',
        Email:''
    }
    handleFullName=(event)=>{
        this.setState({
            FullName: event.target.value
        })
    }
    handleEmail=(event)=>{
        this.setState({
            Email: event.target.value
        })
    }
 
    render(){
        return(
            <div className='suport'>
                <div style={{margin:'30px 0 0 25px', textAlign:'center'}} >
                    <Typography style={{fontSize:'16.5px'}}>
                        To help Us serve you better, please provide some information before we begin your chat
                    </Typography>
                    <Typography  className='if'style={{fontSize:'16.5px'}} >
                       If you have an account, please <Link to ='/login'>login</Link> for more tailored and personal service
                    </Typography>
                </div>
                <div className='help' >
                    
                    <TextField
                    className='qn'
                    id="outlined-multiline-static"
                    label="Your Question:"
                    multiline
                    rows={7}
                    placeholder="Start by telling us what you need help with:
                    -what help do you need help with 
                    -What are you trying to achieve"
                    variant="outlined"
                    
                    
                  />
                
                <Typography  style={{margin:'10px 0 0px 0px'}} className='dep' >
                    Department
                </Typography>
                <FormControl variant="outlined"  className='fom' >
                 <Select
                     native
                     inputProps={{
                        name: 'depatment',
                        id: 'outlined-age-native-simple',
                        }}
                    >
                     <option aria-label="None" value="" />
                     <option >Product& Services</option>
                     <option >Purchase Module</option>
                     <option >Code & Debug</option>
                </Select>
              </FormControl>
                <Typography style={{margin:'10px 0 0px 0px'}} >FullName</Typography>
                  <TextField variant='outlined'  
                   value={this.state.FullName}
                   onChange={this.handleFullName}
                   className='full'
                  />
                
                
                <Typography style={{margin:'30px 0 0px 0px'}}>
                 Email</Typography>
                 <TextField variant='outlined'
                 type='email'
                 required='required'
                 value={this.state.Email}
                 onChange={this.handleEmail}
                 className='ema'
                 /><br/>

                 <div className='end'>          
                  <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />By using this service, you provide explicity consent for Skylla with  to collect 
                            and process the personal data you submit and or/ any personal data that may be
                            necessary to support helping you with you request(s) <br/>
                            You also agree to our Privacy Policy, Terms of service and any related policies.<br/>
                
                        <Button variant='contained' color='secondary' 
                         style={{
                            margin: '30px 0 20px 30px',
                            borderRadius:'5px',
                            textTransform:'capitalize'

                         }} >Start Chat
                         </Button>

                 </div>

         
                        
                </div>
               
               <Footer/>
            </div>
        )
          
        
    }
}
export default LiveSupport2