/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Button } from '@material-ui/core';


export default class MessageImage extends React.Component {
  state = {
    isOpen: false,
    messageIndex: 0,
  };

  onClickImage = () => {
    this.setState({ isOpen: true });
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isOpen) {
      return {};
    }
    const { imageMessages, currentMessage } = props;
    const messagesIds = imageMessages.map(item => item.id);
    const messageIndex = messagesIds.indexOf(currentMessage.id);
    return { messageIndex };
  }

  render() {
    const { imageMessages, currentMessage, imageProps, containerStyle, imageStyle } = this.props;
    const { isOpen, messageIndex } = this.state;
    if (isOpen) { console.log('messageIndex', messageIndex); }
    return (
      <Button
        onPress={this.onClickImage}
        style={{ ...styles.container, ...containerStyle }}
      >
        <img
          {...imageProps}
          style={[styles.image, this.props.imageStyle]}
          src={{ uri: currentMessage.image }}
        />
        {isOpen && (
          <Lightbox
            onCloseRequest={() => this.setState({ isOpen: false })}
            mainSrc={imageMessages[messageIndex].image}
            nextSrc={imageMessages[(messageIndex + 1) % imageMessages.length].image}
            prevSrc={imageMessages[(messageIndex + imageMessages.length - 1) % imageMessages.length].image}
            onMovePrevRequest={() => this.setState({
              messageIndex: (messageIndex + imageMessages.length - 1) % imageMessages.length,
            })
            }
            onMoveNextRequest={() => this.setState({
              messageIndex: (messageIndex + 1) % imageMessages.length,
            })
            }

          />
        )}
      </Button>
    );
  }
}

const styles = {
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
};

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  // containerStyle: ViewPropTypes.style,
  // imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
