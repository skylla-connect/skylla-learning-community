/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/core';

import React, { useState } from 'react';
import { CountryRegionData } from "react-country-region-selector";
import * as colors from "../../styles/colors";
import Footer from "../../components/Footer/footer";
import TextFieldMui from "../components/textField";
import VisaLogo from "./static/Icon_Visa.png";
import MasterLogo from "./static/Icon_MasterCard.png";
import { dispatchCTX, stateCTX } from "../../session/checkout-context";
import * as mq from '../../styles/media-queries';
import FirebaseContext from 'firebase';
// import modules from "../cart/components/data/modules.json";

// MUI stuff
import  makeStyles  from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhoneIphoneOutlined from '@material-ui/icons/PhoneIphoneOutlined';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import { FormGroup, Spinner} from '../../components';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import FlutterPay from '../checkout/flWave';
import ToggleButton from "@material-ui/lab/ToggleButton";
import {
    FormControl, 
    withStyles, 
    CardHeader, 
    InputLabel, 
    MenuItem, 
    Select, 
    Table, 
    TableBody, 
    TableCell, 
    TextField, 
    TableRow, 
    TableFooter, 
    RadioGroup, 
    Paper, 
    Radio, 
    Accordion, 
    IconButton, 
    AccordionDetails, 
    AccordionSummary 
} from '@material-ui/core';
import useCallbackStatus from '../../utils/use-callback-status';
import { withFirebase } from '../../firebase';
import { completePayment } from '../cart/sandbox';

const StyledToggleButton = withStyles({
    root: {
      fontFamily: 'Arial',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.25px',
      color: colors.gray80,
      padding: '15px 15px',
      textTransform: 'none',
      width: '100%',
      '&$selected': {
        backgroundColor: 'rgba(33, 137, 214, 0.14)',
        color: 'rgb(26, 88, 159)',
        '&:hover': {
          backgroundColor: 'rgba(33, 137, 214, 0.14)',
          color: 'rgb(26, 88, 159)',
        },
      },
    },
    selected: {
    },
  })(ToggleButton);
  
  const StyledGroupButton = withStyles({
    root: {
      padding: '15px 15px',
      width: '100%',
    },
  })(ToggleButtonGroup);
  const SavedCard = ({...props}) => (
    <Accordion style={{backgroundColor: colors.bluegray, width: "100%"}}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <span style={{fontSize: "15px"}}>
            <IconButton style={{padding: "0px"}}>
                <Radio name={props.card.cardNo} value={props.card.cardNo} 
                style={{padding: "0px 0px 0px 10px", color: "#FFC107"}}/>
            </IconButton>
            {props.card.type === "Visa card"? <img style={{paddingRight: "20px"}} 
            src={VisaLogo} alt="visa"/>: <img style={{paddingRight: "20px"}} 
            src={MasterLogo} alt="master"/> }
            {props.card.type} 
        </span> 
    </AccordionSummary>
    <AccordionDetails>
    <Card style={{
    backgroundColor: "#FFF",
    padding: "30px 25px"}}>
    <FormGroup style={{backgroundColor: "#fff"}}>
    <TextFieldMui 
        type ="text" 
        value={props.card.cardName}
        label = "Name on Card"
        inputProps ={{style: {fontSize: '13.5px'}}}
        />
    </FormGroup>
    <FormGroup style={{backgroundColor: "#fff", marginTop: "10px" }}>
    <TextFieldMui 
        type ="text"
        value={props.card.cardNo}
        label = "Card Number"
        inputProps ={{ style: {fontSize: '13.5px'}}}
    />
    </FormGroup>
<div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}} >
    <div style={{ display: "flex"}}>
        <FormGroup style={{width: "100px" ,backgroundColor: colors.base}}>
            <TextFieldMui 
                type ="text"
                value={props.card.expiryMonth}
                label = "MM"
                inputProps ={{ style: {fontSize: '13px'}}}
                />
        </FormGroup>
        <FormGroup style={{width: "100px", backgroundColor: colors.base}}>
            <TextFieldMui 
                inputProps ={{ style: {fontSize: '13px'}}}
                value={props.card.expiryYear}
                type ="text"
                label = "YYYY"
                />
        </FormGroup>
    </div>
    <FormGroup style={{width: "100px", backgroundColor: colors.base}}>
        <TextFieldMui 
            type ="text"
            value={props.card.CCV}
            inputProps ={{ style: {fontSize: '13.5px'}}}
            label = "CCV"
            />
    </FormGroup>
</div>
  </Card>
    </AccordionDetails>
</Accordion> 
);

  export function Savedcards (props) {
    const dispatch = React.useContext(dispatchCTX);
    const [value, setValue] = React.useState("add");
    const [name, setName] = React.useState("add");
    const [cardName, setCardName] = React.useState("");
    const [cardNo, setCardNo] = React.useState("");
    const [expiryMonth, setExpiryMonth] = React.useState("");
    const [expiryYear, setExpiryYear] = React.useState("");
    const [CCV, setCCV] = React.useState("");
    const onChangeCard = (event) => {
    setValue(event.target.value);
    setName(event.target.name);
    }
    const selectedCard = (card) => {
        dispatch({type: "selected", payload: card});
    }
    React.useEffect(() => {
        if (name === "add") {
            const card = {
                cardName: cardName, 
                cardNo: cardNo,
                expiryMonth: expiryMonth,
                expiryYear: expiryYear,
                CCV: CCV
            }
            dispatch({type: "add", payload: card});
        }
    },[name, cardName, cardNo, expiryYear, expiryMonth, CCV]);
    React.useEffect(() => {
        [
            {
                type:"Visa card",
                cardName: "kayongo david",
                cardNo: "1234-4567-234",
                expiryMonth: "JUN",
                expiryYear: "2020",
                CCV: "1234"
        }, 
        {
            type: "Master card",
            cardName: "kayongo david",
            cardNo: "1234-4567-284",
            expiryMonth: "JUN",
            expiryYear: "2020",
            CCV: "1234"
        
        } ].map(item => {
            switch (name) {
                case item.cardNo:
                    selectedCard(item);
                    break;
                default:
                    break;
        }
        });
    },[value, name]);
    return ( 
    <div>
        <FormGroup style={{
            padding: 10,
            backgroundColor: colors.bluegray, 
            width: "100%",
            cursor: 'pointer',
            boxShadow: '0 1.5px 1px 0px grey',
            borderRadius: 7
        }}>
            
                    <FlutterPay/>
        </FormGroup>
    {/* <RadioGroup 
    name={name}
    value={value}
    onChange={onChangeCard}
    >
        <Accordion style={{backgroundColor: colors.bluegray, width: "100%"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <span style={{fontSize: "15px"}}>
            <IconButton style={{padding: "0px"}}>
                <Radio name="add" value="add" style={{padding: "0px 40px 0px 10px", color: "#FFC107"}}/>
            </IconButton>
            <AddIcon style={{color: colors.gray80}}  />  
            Add card
        </span> 
    </AccordionSummary>
    <AccordionDetails>
    <Card style={{
            backgroundColor: "#FFF",
            padding: "30px 25px"}}>
            <FormGroup style={{backgroundColor: "#fff"}}>
            <TextFieldMui 
                type ="text"
                variant="outlined"
                value={cardName}
                onChange={(ev) => setCardName(ev.target.value)}
                label = "Name on Card"
                inputProps ={{ style: {fontSize: '13.5px'}}}
                />
            </FormGroup>
            <FormGroup style={{backgroundColor: "#fff", marginTop: "10px" }}>
            <TextFieldMui 
                type ="text"
                variant="outlined"
                label = "Card Number"
                value={cardNo}
                onChange={(ev) => setCardNo(ev.target.value)}
                inputProps ={{ style: {fontSize: '13.5px'}}}
            />
            </FormGroup>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}} >
            <div style={{ display: "flex"}}>
                <FormGroup style={{width: "100px" ,backgroundColor: colors.base}}>
                    <TextFieldMui 
                        type ="text"
                        variant="outlined"
                        label = "MM"
                        value={expiryMonth}
                        onChange={(ev) => setExpiryMonth(ev.target.value)}
                        inputProps ={{ style: {fontSize: '13px'}}}
                        />
                </FormGroup>
                <FormGroup style={{width: "100px", backgroundColor: colors.base}}>
                    <TextFieldMui 
                        inputProps ={{ style: {fontSize: '13px'}}}
                        type ="text"
                        variant="outlined"
                        label = "YYYY"
                        value={expiryYear}
                        onChange={(ev) => setExpiryYear(ev.target.value)}
                        />
                </FormGroup>
            </div>
            <FormGroup style={{width: "100px", backgroundColor: colors.base}}>
                <TextFieldMui 
                    type ="text"
                    variant="outlined"
                    inputProps ={{ style: {fontSize: '13.5px'}}}
                    label = "CCV"
                    value={CCV}
                    onChange={(ev) => setCCV(ev.target.value)}
                    />
            </FormGroup>
        </div>
        <FormGroup style={{display: "flex", flexDirection: 'row', marginTop: "30px"}}>
            <TextField
            type="checkbox"
            variant="outlined"
            checked={true}
            />
            <Typography variant="caption" style={{paddingLeft: "30px"}}>
                Remember this Card
            </Typography>
        </FormGroup>
        </Card>
    </AccordionDetails>
    </Accordion>
            {[
                {
                    type:"Visa card",
                    cardName: "kayongo david",
                    cardNo: "1234-4567-234",
                    expiryMonth: "JUN",
                    expiryYear: "2020",
                    CCV: "1234"
            }, 
            {
                type: "Master card",
                cardName: "kayongo david",
                cardNo: "1234-4567-284",
                expiryMonth: "JUN",
                expiryYear: "2020",
                CCV: "1234"
            
            } ].map(item => {
                return (
                    <SavedCard card={item} />
                );
            })}
        </RadioGroup> */}
        </div>
    );
        
}
  
  export function MoMoPay () {
      const [name, setName] = React.useState("momo");
      const [value, setValue] = React.useState("momo");
      const [partyId, setPartyId] = React.useState("");
      const dispatch = React.useContext(dispatchCTX);

      const handleChangeCard = (event) => {
          setValue(event.target.value);
          setName(event.target.name);
      }
      const handleChangeEvent = (event) => {
        setPartyId(event.target.value);
        dispatch({type: "partyId", payload: event.target.value});
    };
      return (
          <RadioGroup
          name={name}
          value={value}
          onChange={handleChangeCard}
          >
        <Accordion style={{backgroundColor: colors.bluegray, width: "100%"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <span style={{fontSize: "15px"}}>
            <IconButton style={{padding: "0px"}}>
                <Radio name="momo" value="momo" style={{padding: "0px 20px 0px 10px", color: "#FFC107"}}/>
            </IconButton>
            {/* <CreditCardOutlinedIcon style={{color: "#00ffbg"}}/>   */}
            MoMo Pay
        </span> 
    </AccordionSummary>
    <AccordionDetails>
    <Card style={{
            width: "100%",
            backgroundColor: "#FFF",
            padding: "30px 25px"}}>
            <FormGroup style={{backgroundColor: "#fff"}}>
            <TextFieldMui 
                type ="text"
                variant="outlined"
                label = "Phone number"
                value={partyId}
                onChange={handleChangeEvent}
                inputProps ={{ style: {fontSize: '13.5px'}}}
                />
            </FormGroup>
        </Card>
    </AccordionDetails>
    </Accordion>
    {/* <Accordion style={{backgroundColor: colors.bluegray, width: "100%"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <span style={{fontSize: "15px"}}>
            <IconButton style={{padding: "0px"}}>
                <Radio name="airtel" value="airtel" style={{padding: "0px 20px 0px 10px", color: "#FFC107"}}/>
            </IconButton> 
            Airtel
        </span> 
    </AccordionSummary>
    <AccordionDetails>
    <Card style={{
            backgroundColor: "#FFF",
            padding: "30px 25px"}}>
            <FormGroup style={{backgroundColor: "#fff"}}>
            <TextFieldMui 
                type ="text"
                variant="outlined"
                label = "Name on Card"
                inputProps ={{ style: {fontSize: '13.5px'}}}
                />
            </FormGroup>
        </Card>
    </AccordionDetails>
    </Accordion>  */}
        </RadioGroup>
      );
  }
  export function ObjectViewCard(props) {
    const classes = useStyles();
  
    const [alignment, setAlignment] = React.useState('left');
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleChange = (
      event,
      newAlignment
    ) => {
      setAlignment(newAlignment);
    };
  
    const children = [
      <StyledToggleButton key={1} value="left">
        {props.leftButtonContent}
      </StyledToggleButton>,
      <StyledToggleButton key={2} value="right">
        {props.rightButtonContent}
      </StyledToggleButton>,
    ];
    return (
        <FormGroup>
            <Card>
                <hr className={classes.divider}/>
            <div 
                style={{textAlign: 'center'}} 
                className={`row ${classes.rowContainer}`}
                ></div>
            <StyledGroupButton value={alignment} exclusive onChange={handleChange}>
                {children}
            </StyledGroupButton>
            </Card>
            <Paper style={{padding: "20px", margin: "10px 0px"}}>
            {
            alignment === "left" ? <MoMoPay />:
            <Savedcards />
            }
        </Paper>
      </FormGroup>
      );
    }

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%', 
      margin: 'auto',
    },
    grid: {
      width: '100%', 
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
          width: '100%'
      }
    }
  }));

const Checkout = (props) => {
    const dispatch = React.useContext(dispatchCTX);
    const context = React.useContext(stateCTX);
    const [loading, setLoading] = React.useState(false)
    const db = FirebaseContext.firestore()
    const [art , setArt] = React.useState([]);
    const [country, setCountry] = React.useState('select country');
    const classes = useStyles();
    // const learnContent = ["content", "content", "content", "content", "content", "content"]
    const handleChangeEvent = (event) => {
        event.preventDefault();
        setCountry(event.target.value)
        dispatch({type: "address", payload: event.target.value});
    };
    const handleCheckout = (event) => {
        event.preventDefault();
        setLoading(true);
        const {cardDetails, billingAddress, totalPrice, partyId } = context;
        const orderDetails = {
            userId : props.firebase.auth.currentUser.uid,
            course: data,
            payment: context,
        }
        completePayment(partyId, "10000").then(() => {
            return ( props.firebase.doAddItemToCart(orderDetails)
            .then(() => {
                setLoading(false)
                props.history.push(`/cart/module/message`)
            }).catch(err => console.log(err)))
        }).catch(err => console.log(err))
       
       
    }
    async function getModule(modId) {
        return await (db.collection('modules')
        .get()
            .then(snapshot => {
            console.log(snapshot.docs);
            const data = snapshot.docs.map(doc => doc.data())
            setArt(data);
                // dispatch({type: "fetch", payload: snapshot.docs})
            return snapshot.docs;
            })
        )
    }
    const { data, status, isPending, isRejected, isResolved, error, run} = useCallbackStatus()
    React.useEffect(() => {
      run(getModule(props.modId))
      dispatch({type: "totals", payload: 50000.00})
    },[]);;
    const book = art.find(item => item.id === props.modId);
    if (isPending) {
        return (
          <div css={{marginTop: '2em', fontSize: '2em', textAlign: 'center'}}>
            <Spinner />
          </div>
        )
      }
      if (isRejected) {
        return (
          <div css={{color: 'red'}}>
            <p>Oh no, there was an error.</p>
            <pre>{error.message}</pre>
          </div>
        )
      }
      if (isResolved && !book) {
        return (
          <div css={{color: 'red'}}>
            <p>Hmmm... Something went wrong. Please try another module.</p>
          </div>
        )
      }
      const {module, trainer, imageUrl, content, description} = book;

    return ( 
        <div className={classes.root}>
            <Grid container spacing={6} className={classes.grid}>
                <Grid container spacing={6} style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    }} className={classes.grid}>
                        <Grid item xs={12} sm={8} style={{marginTop: '40px'}}>
                            <Typography variant="h6" style={{
                                margin: '20px'
                            }}>
                                Checkout
                            </Typography>

                            <FormGroup style={{
                                // width: "220px",
                                    height: "45px"
                                }}>

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Billing Address
                                    </InputLabel>
                                    <Select
                                    style={{height: "35px", fontSize: '14px'}}
                                    label="Billing Address"
                                    labelId="demo-simple-select-outlined-label"
                                    inputProps={{
                                        name: "Billing Address",
                                        id: "demo-simple-select-outlined"
                                    }}
                                    value={country}
                                    onChange={handleChangeEvent}
                                    >
                                    <MenuItem value="" disabled>
                                        <em>Country</em>
                                    </MenuItem>
                                    
                                    {CountryRegionData.map( (item, index) => {
                                        return (
                                            <MenuItem value={item[0]} key={item[0]}>
                                                {item[0]}
                                            </MenuItem>
                                        );
                                    })}
                                    </Select>
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <ObjectViewCard 
                                leftButtonContent={
                                <span>
                                    <PhoneIphoneOutlined 
                                    // style={{color: colors.gray20}} 
                                    className={classes.icon}/> MoMo Pay
                                </span>} 
                                rightButtonContent={
                                    <span>
                                     Other
                                    </span>
                                }/>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Card css={{
                                display: 'flex',
                                flexDirection: "column",
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: "165%",
                                [mq.small]: {
                                    width: '100%'
                                },
                                height: 'inherint',
                                // padding: "20px 15px"
                            }}>
                                <CardHeader title="Summary"/>
                                    <CardContent>
                                        <div>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Original Price: </TableCell>
                                                        <TableCell>Ush. 50000.00</TableCell>
                                                    </TableRow>
                                                    
                                                    <TableRow>
                                                            <TableCell>Coupon Discounts: </TableCell>
                                                            <TableCell>Ugx. 0.00 </TableCell>
                                                    </TableRow>
                                                </TableBody>

                                                <TableFooter>
                                                    <TableRow>
                                                        <TableCell>Total</TableCell>
                                                    <TableCell>Ugx. 50000.00 </TableCell>
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>
                                        </div>

                                        <Typography style={{padding: "20px 0px"}} variant="body2">
                                            <span style={{fontWeight: 'bold', marginRight: 5}}>
                                                SKYLLA
                                            </span> 
                                            is required by law to collect applicable
                                            taxes for purcharses made in some tax juridications
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            By completing your purcharse you have agreed to these 
                                            <a href="#">
                                                Terms and Conditions
                                            </a>
                                        </Typography>
                                        {/* <div>
                                            <FormGroup style={{paddingTop: "20px"}}>
                                                <Button style={{backgroundColor: '#FF0000'}}
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={handleCheckout}
                                                    >
                                                        <FlutterPay/>
                                                </Button>
                                            </FormGroup>
                                        </div> */}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div>
                                <div
                                    css={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 2fr',
                                    gridGap: '2em',
                                    marginBottom: '1em',
                                    [mq.small]: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                    },
                                    }}
                                >
                                <img
                                    src={imageUrl}
                                    alt={`${module} book cover`}
                                    css={{
                                        width: '100%',
                                        maxWidth: 200,
                                    }}
                                />
                            <div>

                            <div css={{display: 'flex', position: 'relative'}}>
                                <div css={{flex: 1, justifyContent: 'space-between'}}>
                                    <h1>{module}</h1>
                                    <div>
                                        <i>{trainer}</i> {art.modId}
                                        <span css={{marginRight: 6, marginLeft: 6}}>|</span>
                                        <i>{content}</i>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <p>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </Grid>
                    
            </Grid>
            
            <Footer/>
        </div>
    );
}
 
export default withFirebase(Checkout);