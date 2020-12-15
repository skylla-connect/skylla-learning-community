/* eslint no-use-before-define: ["error", { "variables": false }], padded-blocks: 0 */

import PropTypes from 'prop-types';
import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Color from './Color';
import { Typography } from '@material-ui/core';

const { carrot, emerald, peterRiver, wisteria, alizarin, turquoise, midnightBlue } = Color;
const styles = makeStyles((theme) =>  ({
    avatarStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    avatarTransparent: {
      backgroundColor: Color.backgroundTransparent,
    },
    textStyle: {
      color: Color.white,
      fontSize: 16,
      backgroundColor: Color.backgroundTransparent,
      fontWeight: '100',
    },
  }));
export default class Avatar extends React.Component {
  classes = styles();
  setAvatarColor() {
    const userName = this.props.user.name || '';
    const name = userName.toUpperCase().split(' ');
    if (name.length === 1) {
      this.avatarName = `${name[0].charAt(0)}`;
    } else if (name.length > 1) {
      this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
    } else {
      this.avatarName = '';
    }

    let sumChars = 0;
    for (let i = 0; i < userName.length; i += 1) {
      sumChars += userName.charCodeAt(i);
    }

    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [carrot, emerald, peterRiver, wisteria, alizarin, turquoise, midnightBlue];

    this.avatarColor = colors[sumChars % colors.length];
  }

  renderAvatar() {
    if (typeof this.props.user.avatar === 'function') {
      return this.props.user.avatar();
    } if (typeof this.props.user.avatar === 'string') {
      return <Image source={{ uri: this.props.user.avatar }} style={[styles.avatarStyle, this.props.avatarStyle]} />;
    } if (typeof this.props.user.avatar === 'number') {
      return <Image source={this.props.user.avatar} style={[styles.avatarStyle, this.props.avatarStyle]} />;
    }
    return null;
  }

  renderInitials() {
    return <Typography style={[styles.textStyle, this.props.textStyle]}>{this.avatarName}</Typography>;
  }

  render() {
    if (!this.props.user.name && !this.props.user.avatar) {
      // render placeholder
      return (
        <div
          style={[this.classes.avatarStyle, this.classes.avatarTransparent, this.props.avatarStyle]}
          accessibilityTraits="image"
        />
      );
    }
    if (this.props.user.avatar) {
      return (
        <Button
          disabled={!this.props.onPress}
          onClick={() => {
            const { onPress, ...other } = this.props;
            if (this.props.onPress) {
              this.props.onPress(other);
            }
          }}
          accessibilityTraits="image"
        >
          {this.renderAvatar()}
        </Button>
      );
    }

    this.setAvatarColor();

    return (
      <Button
        disabled={!this.props.onPress}
        onClick={() => {
          const { onPress, ...other } = this.props;
          if (this.props.onPress) {
            this.props.onPress(other);
          }
        }}
        style={{ ...this.classes.avatarStyle, backgroundColor: this.avatarColor, ...this.props.avatarStyle }}
        accessibilityTraits="image"
      >
        {this.renderInitials()}
      </Button>
    );
  }
}

Avatar.defaultProps = {
  user: {
    name: null,
    avatar: null,
  },
  onPress: null,
  avatarStyle: {},
  textStyle: {},
};

Avatar.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
  avatarStyle: Image.propTypes.style,
  textStyle: Text.propTypes.style,
};
