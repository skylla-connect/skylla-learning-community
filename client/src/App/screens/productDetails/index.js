/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/core';

import React from 'react';
import * as colors from "../../styles/colors";
import Footer from "../../components/Footer/footer";
import * as mq from '../../styles/media-queries';
import FirebaseContext from 'firebase';
// import modules from "../cart/components/data/modules.json";

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
import { FormGroup, Spinner} from '../../components';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../../firebase';
import useCallbackStatus from '../../utils/use-callback-status';
import { Link } from '@reach/router';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    grid: {
      width: '100%', 
      margin: 'auto',
      [theme.breakpoints.down('sm')]: {
          width: '100%'
      }
    }
  }));

const Product = (props) => {
    const classes = useStyles();
    const db = FirebaseContext.firestore()
    const [art , setArt] = React.useState([]);
    const learnContent = ["content", "content", "content", "content", "content", "content"]
    async function getModule(modId) {
        return await (db.collection('modules')
        .get()
          .then(snapshot => {
            console.log(snapshot.docs);
            const data = snapshot.docs.map(doc => doc.data())
            setArt(data);
              // dispatch({type: "fetch", payload: snapshot.docs})
            return snapshot.docs;
          }))
      }
    const { data, status, isPending, isRejected, isResolved, error, run} = useCallbackStatus()
    React.useEffect(() => {
      run(getModule(props.modId))
    },[]);
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
            <p>Hmmm... Something went wrong. Please try another book.</p>
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
                <Grid item xs={12} sm={6} style={{marginTop: '40px'}}>
                    <Card style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        backgroundColor: colors.gray,
                        height: '15vh',
                    }}>
                        <CardMedia>
                        <Tooltip title="Cart" aria-label="Cart" style={{}}>
                        <Fab>
                        <AddShoppingCartIcon style={{color: colors.blue}} />
                        </Fab>
                    </Tooltip> 
                        </CardMedia>
                        <CardContent style={{textAlign: 'center'}}>
                            <Typography variant="h6" color="textSecondary">{module}</Typography>
                            <Typography style={{paddingTop: '10px'}} variant="body2"><b>Trainer:</b> {trainer}</Typography>
                            <Typography style={{paddingTop: '10px'}} variant="body2"><b>Description:</b>{description}</Typography>
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
                            <Typography variant="h5" color="textSecondary">What you will learn!!</Typography>
                            <Typography variant="body" color="textSecondary">{content}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Card style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '25px',
                        height: '70vh',
                    }}>
                        <CardContent style={{
                            textAlign: 'center'}}>
                            <div>
                                <Typography variant="h6">{module}</Typography>
                                <Typography style={{paddingTop: '10px'}} 
                                variant="subtitle2">Preview this Content</Typography>
                            </div>
                            <div style={{padding: "80px 0px"}}>
                                <Typography variant="subtitle1">Ush. 50000.00</Typography>
                            </div>
                            <div>
                                <FormGroup>
                                  <Link to={`/cart/checkout/${book.id}`}>
                                    <Button style={{backgroundColor: '#FF0000'}}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        css={{width: "200px"}}
                                        >Buy now!</Button>
                                    </Link>
                                </FormGroup>
                            </div>
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
                <i>{trainer}</i>
                <span css={{marginRight: 6, marginLeft: 6}}>|</span>
                <i>{description}</i>
              </div>
            </div>
          </div>
          <br />
          <p>{content}</p>
        </div>
      </div>
    </div>
            </Grid>
               
        </Grid>
        <Footer/>
        </div>
     );
}
 
export default withFirebase(Product);