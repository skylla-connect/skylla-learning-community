import React from "react";
import Button  from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    button: {
        backgroundColor: '#0000ff'
    }
}
const ButtonMui = (props) => {
    const {classes} = props;
    return ( 
        <Button
        variant={props.variant} 
        color={props.color}
        className={classes.button}
        {...props}
    >{props.text}</Button>
     );
}
 
export default withStyles(styles)(ButtonMui);