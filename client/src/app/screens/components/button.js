import React from "react";
import Button  from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { Spinner } from "../../components";

const styles = {
    button: {
        backgroundColor: '#0000ff',
    }
}
const ButtonMui = (props) => {
    const {classes} = props;
    return ( 
        <Button
        variant={props.variant} 
        color={props.color}
        type={props.type}
        className={classes.button}
        {...props}
    >{props.text} {props.isPending && (<Spinner css={{marginLeft: 5}} /> )}</Button>
     );
}
 
export default withStyles(styles)(ButtonMui);