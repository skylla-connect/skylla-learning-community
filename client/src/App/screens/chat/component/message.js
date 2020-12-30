
import PropTypes from 'prop-types';
import React from 'react';

import Avatar from './Avatar';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import Day from './Day';

import { isSameUser, isSameDay } from './utils';

const styles = {
  left: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
    },
  right: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
    },
};

export default class Message extends React.Component {

  shouldComponentUpdate(nextProps) {
    const next = nextProps.currentMessage;
    const current = this.props.currentMessage;
    return (
      next.send !== current.send ||
      next.received !== current.received ||
      next.pending !== current.pending ||
      next.createdAt !== current.createdAt ||
      next.text !== current.text ||
      next.image !== current.image ||
      next.video !== current.video
    );
  }

  getInnerComponentProps = () => {
    const { containerStyle, ...props } = this.props;
    return {
      ...props,
      isSameUser,
      isSameDay,
    };
  };

  renderDay() {
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();
      if (this.props.renderDay) {
        return this.props.renderDay(dayProps);
      }
      return <Day {...dayProps} />;
    }
    return null;
  }

  renderBubble() {
    const bubbleProps = this.getInnerComponentProps();
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps);
    }
    return <Bubble {...bubbleProps} />;
  }

  renderSystemMessage() {
    const systemMessageProps = this.getInnerComponentProps();
    if (this.props.renderSystemMessage) {
      return this.props.renderSystemMessage(systemMessageProps);
    }
    return <SystemMessage {...systemMessageProps} />;
  }

  renderAvatar() {
    if (this.props.user.id === this.props.currentMessage.user.id && !this.props.showUserAvatar) {
      return null;
    }
    const avatarProps = this.getInnerComponentProps();
    const { currentMessage } = avatarProps;
    if (currentMessage.user.avatar === null) {
      return null;
    }
    return <Avatar {...avatarProps} />;
  }

  render() {
    const sameUser = isSameUser(this.props.currentMessage, this.props.nextMessage);
    const {inverted, containerStyle} = this.props;
    return (
      <div>
        {this.renderDay()}
        {this.props.currentMessage.system ? (
          this.renderSystemMessage()
        ) : (
          <div
            style={{
              ...styles[this.props.position],
              marginBottom: sameUser ? 2 : 10,
              // !inverted &&  marginBottom: 2,
              ...containerStyle[this.props.position],
            }}
          >
            {this.props.position === 'left' ? this.renderAvatar() : null}
            {this.renderBubble()}
            {this.props.position === 'right' ? this.renderAvatar() : null}
          </div>
        )}
      </div>
    );
  }

}

Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  renderSystemMessage: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
  showUserAvatar: true,
  inverted: true,
};

Message.propTypes = {
  renderAvatar: PropTypes.func,
  showUserAvatar: PropTypes.bool,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  renderSystemMessage: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  inverted: PropTypes.bool,
  // containerStyle: PropTypes.shape({
  //   left: ViewPropTypes.style,
  //   right: ViewPropTypes.style,
  // }),
};