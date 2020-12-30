/* eslint no-use-before-define: ["error", { "variables": false }] */

import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Color from './Color';


export default function Send({ text, containerStyle, onSend, children, textStyle, label, alwaysShowSend }) {
  if (alwaysShowSend || text.trim().length > 0) {
    return (
      <Button
        style={{ 
          height: 44,
          justifyContent: 'flex-end', ...containerStyle }}
        onClick={() => {
          console.log('asdasdasd')
          onSend({ text: text.trim() }, true);
        }}
      >
        <div>{children || <Typography style={{
          color: Color.defaultBlue,
          fontWeight: '600',
          fontSize: 17,
          backgroundColor: Color.backgroundTransparent,
          marginBottom: 12,
          marginLeft: 10,
          marginRight: 10,
        ...textStyle }}>{label}</Typography>}</div>
      </Button>
    );
  }
  return <div />;
}

const styles = {
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
}

Send.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  children: null,
  alwaysShowSend: false,
};

// Send.propTypes = {
//   text: PropTypes.string,
//   onSend: PropTypes.func,
//   label: PropTypes.string,
//   // containerStyle: ViewPropTypes.style,
//   textStyle: Typography.propTypes.style,
//   children: PropTypes.element,
//   alwaysShowSend: PropTypes.bool,
// };
