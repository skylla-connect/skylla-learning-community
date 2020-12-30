/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';

import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';
import Color from './Color';


const styles = {
  container: {
    borderTopColor: Color.defaultColor,
    backgroundColor: Color.white,
    bottom: 0,
    left: 0,
    right: 0,
  },
  primary: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  accessory: {
    height: 44,
  },
}

class InputToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 'static',
    };
  }
  
  renderActions() {
    if (this.props.renderActions) {
      return this.props.renderActions(this.props);
    } if (this.props.onPressActionButton) {
      return <Actions {...this.props} />;
    }
    return null;
  }

  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <Send {...this.props} />;
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return <Composer {...this.props} />;
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <div 
        style={{...styles.accessory, ...this.props.accessoryStyle}}>
          {this.props.renderAccessory(this.props)}
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <div style={{...styles.container, ...this.props.containerStyle, position: this.state.position, height: this.props.composerHeight }}>
        <div style={{...styles.primary, ...this.props.primaryStyle}}>
          {this.renderActions()}
          {this.renderComposer()}
          {this.renderSend()}
        </div>
        {this.renderAccessory()}
      </div>
    );
  }
}
export default InputToolbar

InputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
  onPressActionButton: () => {},
};

InputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  // containerStyle: ViewPropTypes.style,
  // primaryStyle: ViewPropTypes.style,
  // accessoryStyle: ViewPropTypes.style,
};
