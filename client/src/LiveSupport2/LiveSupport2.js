import React from 'react'
import './LiveSupport2.css'
import { Typography, Select, FormControl, Checkbox, Button} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Footer from '../app/components/Footer/footer'
import {Link, withRouter} from 'react-router-dom'
import { withFirebase } from '../app/firebase'
import { compose } from "recompose";
import { FullPageSpinner } from '../app/components'
import withAuthorization from '../app/session/withAuthorization'
import { useUser } from '../App'
import client from '../app/utils/api-client'


 
const LiveSupport2 = (props) => {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
    const [FullName, setFullName] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const {user, isLoading} = useUser();
    let tokenList = []
    
    React.useEffect(() => {
        props.firebase.doGetTokens()
        .then(snapshot => {
            snapshot.docs.map(doc => {
                console.log(doc.data());
                tokenList.push(doc.data()['admin-access-token'])
            })
        })
    })
    React.useLayoutEffect(() => {
        if (!isLoading) {
          setFirstAttemptFinished(true)
        }
      }, [isLoading])
    
      if (!firstAttemptFinished) {
          return <FullPageSpinner />
      }
    const handleFullName=(event)=>{
        setFullName(event.target.value)
    }
    const handleEmail=(event)=>{
        setEmail(event.target.value)
    }
    console.log(tokenList)
    const handleStartChat = (event) => {
        const notificationData = {
            tokens: tokenList,
            data: { 
                title: FullName,
                roomId: user.userId,
            }
            
          };
          client('broadcast', {body: notificationData})
          .then(() => {
            props.history.push(`/livechat/${user.userId}`)
        })
       
    }
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
                    <option >Product and Services</option>
                    <option >Purchase Module</option>
                    <option >Code and Debug</option>
            </Select>
            </FormControl>
            <Typography style={{margin:'10px 0 0px 0px'}} >FullName</Typography>
                <TextField variant='outlined'  
                value={FullName}
                onChange={handleFullName}
                className='full'
                />
            
            
            <Typography style={{margin:'30px 0 0px 0px'}}>
                Email</Typography>
                <TextField variant='outlined'
                type='email'
                required='required'
                value={Email}
                onChange={handleEmail}
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
                    <div id="firechat-wrapper">
                        <Button variant='contained' color='secondary' 
                        onClick={handleStartChat}
                        style={{
                            margin: '30px 0 20px 30px',
                            borderRadius:'5px',
                            textTransform:'capitalize'

                        }} >Start Chat
                        </Button>
                        </div>

                </div>

        
                    
            </div>
            
            <Footer/>
        </div>
    )
        
    
}
const condition = (authUser) => authUser;
export default compose(
    withRouter,
    withFirebase,
    withAuthorization(condition))(LiveSupport2) 