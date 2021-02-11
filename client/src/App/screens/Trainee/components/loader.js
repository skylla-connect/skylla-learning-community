import React from "react";
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
      variant="contained" 
      color="primary"
    >
      {isLoading && <CheckIcon/>}
      {props.children}
    </Button>
  );
}