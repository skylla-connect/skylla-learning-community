/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import moment from 'moment';

import Color from './Color';
import { TIME_FORMAT } from './Constant';
import { Typography } from '@material-ui/core';

const containerStyle = {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 5,
};

const textStyle = {
  fontSize: 10,
  backgroundColor: 'transparent',
  textAlign: 'right',
};

const styles = {
  left: {
    container: {
      ...containerStyle,
    },
    text: {
      color: Color.timeTextColor,
      ...textStyle,
    },
  },
  right: {
    container: {
      ...containerStyle,
    },
    text: {
      color: Color.white,
      ...textStyle,
    },
  }
};
export default function Time(
  { position, containerStyle, currentMessage, timeFormat, textStyle, timeTextStyle },
  context,
) {
  return (
    <div style={{...styles[position].container, ...containerStyle[position]}}>
      <Typography style={{...styles[position].text, ...textStyle[position], ...timeTextStyle[position]}}>
        {moment(currentMessage.createdAt)
          .locale(context.getLocale())
          .format(timeFormat)}
      </Typography>
    </div>
  );
}



Time.contextTypes = {
  getLocale: PropTypes.func,
};

Time.defaultProps = {
  position: 'left',
  currentMessage: {
    createdAt: null,
  },
  containerStyle: {},
  textStyle: {},
  timeFormat: TIME_FORMAT,
  timeTextStyle: {},
};

Time.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  // containerStyle: PropTypes.shape({
  //   left: ViewPropTypes.style,
  //   right: ViewPropTypes.style,
  // }),
  textStyle: PropTypes.shape({
    left: Typography.propTypes.style,
    right: Typography.propTypes.style,
  }),
  timeFormat: PropTypes.string,
  timeTextStyle: PropTypes.shape({
    left: Typography.propTypes.style,
    right: Text.propTypes.style,
  }),
};
