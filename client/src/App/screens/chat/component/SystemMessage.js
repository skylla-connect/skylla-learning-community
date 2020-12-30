/* eslint no-use-before-define: ["error", { "variables": false }] */

import React from 'react';
import PropTypes from 'prop-types';
import Color from './Color';
import { Typography } from '@material-ui/core';

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: '300',
  },
}

export default function SystemMessage({ currentMessage, containerStyle, wrapperStyle, textStyle }) {
  return (
    <div style={{...styles.container, ...containerStyle}}>
      <div style={{...styles.wrapper, ...wrapperStyle}}>
        <Typography style={{...styles.text, ...textStyle}}>{currentMessage.text}</Typography>
      </div>
    </div>
  );
}

SystemMessage.defaultProps = {
  currentMessage: {
    system: false,
  },
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
};

SystemMessage.propTypes = {
  currentMessage: PropTypes.object,
  // containerStyle: ViewPropTypes.style,
  // wrapperStyle: ViewPropTypes.style,
  // textStyle: Text.propTypes.style,
};
