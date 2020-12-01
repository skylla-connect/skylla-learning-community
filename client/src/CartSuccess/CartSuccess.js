import React from 'react'
import './CartSuccess.css'
import MenuLive from '../CartSuccess/MenuLive'
// import Card from '@material-ui/core/Card'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import Paper from '@material-ui/core/Paper'
// import up from '../CartSuccess/pics/up.png';
import Typography from '@material-ui/core/Typography';


class CartSuccess extends React.Component{
    constructor(props){
        super(props)
        this.state={ 
            name:'printer',
            currentDateTime: Date().toLocaleString()
        };
        
    }
    printReceipt(){
        window.print();
    }
    render(){
        return(
            <div >
                <MenuLive/>
                <div className='kick'>
                    <div className='all' >
                        <div className='cart1'>
                                 <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
                                   alt='pic'
                                   style={{
                                   width:'35%',
                                   height:'50%',
                                   backgroundColor:'blue',
                               
                                }}
                                />
                           
                        </div>

                        <div className='cart2'>
                            <div className='pep' >
                                <Typography style={{textAlign:'center'}}>
                                   RECEIPT
                                   <p>Order #002</p>
                                </Typography>
                          </div>
                        
                        </div>
                        
                        <div className='cart3'>
                              <Typography>
                                  Skylla Learning Community
                              </Typography>
                              <Typography>
                                  P.O.Box.....
                              </Typography>
                              <Typography>
                                  Mpala-Lyamutundwe
                              </Typography>
                          </div>
                        
                    </div>
                    <div className='all2'>
                        <div className='tab1'>
                        <table>
                        <tr>
                            <td>Module Purchased:</td>
                            <td>Javascript</td>
                            {/* <td>Module Purchased</td> */}
                            
                        </tr>
                        <tr>
                            <td>Order Date</td>
                            <td>{this.state.currentDateTime}</td>
                            
                        </tr>
                        <tr>
                            <td>Order Number:</td>
                            <td>3566787</td>
                        </tr>
                        <tr>
                            <td>Transaction ID</td>
                            <td>8997787</td>
                        </tr>
                        <tr>
                            <td>UserName</td>
                            <td>nantume angel</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>
                                <Typography>Namwanza Ronald</Typography>
                                <Typography>Software Developer</Typography> 
                                <Typography>NTB Construction</Typography>
                                <Typography>Kitala Entebbe</Typography> 
                                <Typography>Wakiso District</Typography> 
                                <Typography>Kampala Uganda</Typography> 

                            </td>
                        </tr>
                     </table>
                        </div>

                       <div className='tab2'>
                       <table>
                        <tr>
                            <td>Payment Source</td>
                            <td>Credit Card</td>
                            {/* <td>Module Purchased</td> */}
                            
                        </tr>
                        <tr>
                            <td>Initial Charge</td>
                            <td>Ush:50000</td>
                            
                        </tr>
                        <tr>
                            <td>Final Cost</td>
                            <td>Ush:50000</td>
                        </tr>
                      
                        <tr>
                            <td>Total Refund</td>
                            <td>Ush:0.00</td>
                        </tr>
                        <tr>
                            <td>Refund Transaction ID</td>
                            <td>N/R</td>
                        </tr>
                        <tr>
                            <td>Refunded To</td>
                            <td>N/A</td>
                        </tr>
                     </table>
                       </div>
                    </div>
                    <div>
                        <table className='tab3'> 
                            <tr >
                                <th style={{border:'2px solid black'}}>TYPE</th>
                                <th style={{border:'2px solid black'}}>NAME</th>
                                <th style={{border:'2px solid black'}}>QTY</th>
                                <th style={{border:'2px solid black'}}>DURATION</th>
                                <th style={{border:'2px solid black'}}>PRICE</th>
                                <th style={{border:'2px solid black'}}>TOTAL</th>
                            </tr>
                            <tr>
                                <td style={{border:'2px solid black'}}>Purchase</td>
                                <td style={{border:'2px solid black'}}>Email for Skylla</td>
                                <td style={{border:'2px solid black'}}>1</td>
                                <td style={{border:'2px solid black'}}>1 year</td>
                                <td style={{border:'2px solid black'}}>50000
                                </td>
                                <td style={{border:'2px solid black'}}>50000</td>
                            </tr>
                        </table>
                        <button class="hide-on-print" onClick={this.printReceipt} 
                        className='but'
                        >Print</button>
                    </div>
                   
                    <div >
                        <div className='wud'>
                            <p style={{margin:'15px 0 0 10px'}}> Would you like to purchase for another module? <br/>
                            If Yes....  </p>
                          <ShoppingCartIcon  
                            style={{
                                color:'black',
                                fontSize: '50px',
                                margin:'0 0 0 10px'
                            }}
                           />
                    
                            <button 
                                style=
                                {{backgroundColor:'orangered', 
                                width:'35%', height:'40px', 
                                borderRadius:'10px',
                                color:'white',
                                marginLeft:'5em'
                                }}
                                >Continue
                          </button>
                     </div>
                  </div>
                  
                </div>
            
            </div>
        )
    }
}
export default CartSuccess;
