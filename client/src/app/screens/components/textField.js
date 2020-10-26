import React, { useState } from "react";
import { TextField } from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core/InputAdornment";
import { IconButton } from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const TextFieldMui = ({...props}) => {
    if (props.type == "password") {
        const [showPassword, setShowPassword] = useState(false);
        const handleClickShowPassword = () => setShowPassword(!showPassword);
        return ( 
            <TextField 
            label = {props.label}
            variant = {props.variant}
            type = {showPassword? 'text': 'password'}
            onChange = {props.onChange}
            InputProps= {{
                endAdornment: (
                    <InputAdornment>
                        <IconButton 
                        arial-label ="toggle password visibility"
                        onClick={handleClickShowPassword}>
                            {showPassword? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            />
         );
    } else {
        return (
            <TextField 
            label = {props.label}
            variant = {props.variant}
            type = {props.type}
            onChange = {props.onChange} />
        );
    }
    
}
 
export default TextFieldMui;