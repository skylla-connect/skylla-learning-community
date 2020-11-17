/** @jsx jsx */
import {jsx} from '@emotion/core';

import React from 'react';
import { NavLink as Link } from "react-router-dom";
import * as colors from "../../styles/colors";
import Footer from "../../components/Footer/footer";

// MUI stuff
import  makeStyles  from '@material-ui/core/styles/makeStyles';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { FormGroup} from '../../components';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    grid: {
      width: '90%', 
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
          width: '100%'
      }
    }
  }));

const Product = ({...props}) => {
    const classes = useStyles();
    const learnContent = ["content", "content", "content", "content", "content", "content"]
    return ( 
        <div className={classes.root}>
        <nav className="navbar navbar-default" css={{
            backgroundColor: colors.blue,
            height: '20vh'
        }} >
             <ul className="nav navbar-nav container" css={{
                 display: 'flex',
                 flexDirection: 'row',
             }}>
                <li>
                    <Link exact to="/" 
                    activeStyle={{ color: '#fff'}} 
                    css={{
                        color: colors.base,
                        fontSize: "22px",
                        letterSpacing: '0.15rem'
                    }} >
                        <span></span>
                        &nbsp;Skylla
                    </Link>
                </li>
                <li>
                    <Tooltip title="Cart" aria-label="Cart" style={{color: '#0000FF',}}>
                        <Fab color="primary">
                        <AddShoppingCartIcon style={{color: colors.base}} />
                        </Fab>
                    </Tooltip>
                </li>
             </ul>
        </nav>
        <Grid container spacing={6} className={classes.grid}>
            <Grid container spacing={6} style={{
                display: 'flex',
                justifyContent: 'space-evenly',
               }} className={classes.grid}>
                <Grid item xs={12} sm={6} style={{marginTop: '40px'}}>
                    <Card style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        backgroundColor: colors.gray,
                        height: '25vh',
                    }}>
                        <CardMedia>
                        <Tooltip title="Cart" aria-label="Cart" style={{}}>
                        <Fab>
                        <AddShoppingCartIcon style={{color: colors.blue}} />
                        </Fab>
                    </Tooltip> 
                        </CardMedia>
                        <CardContent style={{textAlign: 'center'}}>
                            <Typography variant="h6" color="textSecondary">Javascript</Typography>
                            <Typography style={{paddingTop: '10px'}} variant="body2">Walkthrough Javascript</Typography>
                        </CardContent>
                    </Card>
                    <Card style={{
                       textAlign: 'center',
                        backgroundColor: colors.gray,
                        height: 'inherient',
                        marginTop: '40px',
                        padding: "50px 20px"
                    }}>
                        <CardContent>
                            <Typography variant="body" color="textSecondary">What you will learn!!</Typography>
                            {learnContent.map( content => {
                               return ( <Typography style={{paddingTop: '8px'}} key={content} variant="body2"><a href="#">{content}</a></Typography>)
                            }) }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} style={{
                    marginTop: '-80px',
                    zIndex: 999,
                }}>
                <Card style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '25px',
                        height: '85vh',
                    }}>
                        <CardContent style={{
                            textAlign: 'center'}}>
                            <div>
                                <Typography variant="h6">Javascript</Typography>
                                <Typography style={{paddingTop: '10px'}} 
                                variant="subtitle2">Preview this Content</Typography>
                            </div>
                            <div style={{padding: "80px 0px"}}>
                                <Typography variant="subtitle1">Ush. 50000.00</Typography>
                            </div>
                            <div>
                                <FormGroup>
                                    <Button style={{backgroundColor: '#FF0000'}}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        >GO to Cart</Button>
                                </FormGroup>
                                <FormGroup style={{marginTop: "15px"}}>
                                <Button style={{
                                    width: '250px',
                                    backgroundColor: "#000000"}}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        >Buy Now!</Button>
                                </FormGroup>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
            <Card style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.gray,
                        height: '12vh',
                        marginBottom: '20px',
                    }}>
                        <CardContent>
                            <Typography variant="body">More about the module</Typography>
                        </CardContent>
                    </Card>
            </Grid>
               
        </Grid>
        <Footer/>
        </div>
     );
}
 
export default Product;