import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid';

import * as utils from './utils';
import Actions from './Actions';
import Avatar from './Avatar';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import MessageImage from './MessageImage';
import MessageText from './MessageText';
import Composer from './Composer';
import Day from './Day';
import InputToolbar from './InputToolbar';
import { Spinner } from '../../../components';
import Message from './Message';
import MessageContainer from './MessageContainer';
import Send from './Send';
import Time from './Time';
import {
  MIN_COMPOSER_HEIGHT,
  MAX_COMPOSER_HEIGHT,
  DEFAULT_PLACEHOLDER,
  TIME_FORMAT,
  DATE_FORMAT,
} from './Constant';

const styles ={
  message: {
     // width: '100%',
     height: '300px',
     display: 'flex',
  }
}

const ChatUI = (props) => {
    const [isInitialized, setIsInitialized] = React.useState(false)
    const [composerHeight, setComposerHeight] = React.useState(50)
    const [typingDisabled, setTypingDisabled] = React.useState(false)
    const [text, setText] = React.useState(props.text)

    let _isFirstLayout = true;
    let _locale = 'en';
    let _messages = [];
    let _bottomOffset = 0;
    const mounted = React.useRef(false)
    React.useLayoutEffect(() => {
      mounted.current = true
      return () => (mounted.current = false)
    }, [])
    const invertibleScrollViewProps = {
      inverted: props.inverted,
    };
    const append = (currentMessages = [], messages, inverted = true) => {
        if (!Array.isArray(messages)) {
          messages = [messages];
        }
        return inverted ? messages.concat(currentMessages) : currentMessages.concat(messages);
      }
    
    const prepend = (currentMessages = [], messages, inverted = true) => {
        if (!Array.isArray(messages)) {
          messages = [messages];
        }
        return inverted ? currentMessages.concat(messages) : messages.concat(currentMessages);
      }
    const getChildContext = () => {
        return {
          getLocale: getLocale(),
        };
      }
    React.useEffect(() => {
      const { messages, text } = props;
      initLocale();
      setMessages(messages || []);
      setTextFromProp(text);
      setIsInitialized(true);
    }, [_messages, text])
    const initLocale = () => {
      if (props.locale === null || moment.locales().indexOf(props.locale) === -1) {
        setLocale('en');
      } else {
        setLocale(props.locale);
      }
    }
  
    const setLocale = (locale) => {
      _locale = locale;
    }
  
    const getLocale = () => {
      return _locale;
    }
    const setTextFromProp = (textProp) => {
      // Text prop takes precedence over state.
      if (textProp !== undefined && textProp !== text) {
        setText({ text: textProp });
      }
    }
    const getTextFromProp = (fallback) => {
      if (props.text === undefined) {
        return fallback;
      }
      return props.text;
    }
  
    const setMessages = (messages) => {
      _messages = messages;
    }
  
    const getMessages = () => {
      return _messages;
    }
  
    const setBottomOffset = (value) => {
      _bottomOffset = value;
    }
  
    const getBottomOffset = () => {
      return _bottomOffset;
    }
  
    const setIsFirstLayout = (value) => {
      _isFirstLayout = value;
    }
  
    const getIsFirstLayout = () => {
      return _isFirstLayout;
    }
    const setIsTypingDisabled = (value) => {
      setTypingDisabled({
        typingDisabled: value,
      });
    }
  
    const getIsTypingDisabled = () => {
      return typingDisabled;
    }

    const renderMessages = () => {
      return (
        <div style = {{...styles.message}}
        >
          <p>hey there</p>
          <MessageContainer
            {...props}
            invertibleScrollViewProps={invertibleScrollViewProps}
            messages={getMessages()}
            // ref={component => this._messageContainerRef = component}
          />
          {renderChatFooter()}
        </div>
      );
    }
    const onSend = (messages = [], shouldResetInputToolbar = false) => {
      if (!Array.isArray(messages)) {
        messages = [messages];
      }
      messages = messages.map(message => ({
        ...message,
        user: props.user,
        createdAt: new Date(),
        id: props.messageIdGenerator(),
      }));
  
      if (shouldResetInputToolbar === true) {
        setIsTypingDisabled(true);
        resetInputToolbar();
      }
  
      props.onSend(messages);
      scrollToBottom();
  
      if (shouldResetInputToolbar === true) {
        setTimeout(() => {
          if (mounted.current === true) {
            setIsTypingDisabled(false);
          }
        }, 100);
      }
    }
    const scrollToBottom = (animated = true) => {
      if (this._messageContainerRef === null) {
        return;
      }
      this._messageContainerRef.scrollTo({
        y: 0,
        animated,
      });
    }
    const resetInputToolbar = () => {
      notifyInputTextReset();
      setText({
        text: getTextFromProp(''),
      });
    }
  
    // const focusTextInput = () => {
    //   if (textInput) {
    //     textInput.focus();
    //   }
    // }
  
  
    const onInputTextChanged = (text) => {
      if (getIsTypingDisabled()) {
        return;
      }
      if (props.onInputTextChanged) {
        props.onInputTextChanged(text);
      }
      // Only set state if it's not being overridden by a prop.
      if (props.text === undefined) {
        setText({ text });
      }
    }
  
    const notifyInputTextReset = () => {
      if (props.onInputTextChanged) {
        props.onInputTextChanged('');
      }
    }
    const renderInputToolbar = () => {
      const inputToolbarProps = {
        ...props,
        text: getTextFromProp(text),
        composerHeight: composerHeight,
        onSend: onSend,
        // onInputSizeChanged: onInputSizeChanged,
        onTextChanged: onInputTextChanged,
        textInputProps: {
          ...props.textInputProps,
          ref: textInput => (textInput = textInput),
          maxLength: getIsTypingDisabled() ? 0 : props.maxInputLength,
        },
      };
      if (props.renderInputToolbar) {
        return props.renderInputToolbar(inputToolbarProps);
      }
      return (
        <InputToolbar
          {...inputToolbarProps}
        />
      );
    }
  
    const renderChatFooter = () => {
      if (props.renderChatFooter) {
        const footerProps = {
          ...props,
        };
        return props.renderChatFooter(footerProps);
      }
      return null;
    }
  
    const renderLoading = () => {
      if (props.renderLoading) {
        return props.renderLoading();
      }
      return null;
    }

    if ( isInitialized === true) {
      return (
        <div style={styles.container}>
          {renderMessages()}
          {renderInputToolbar()}
        </div>
      );
    }
    return (
      <div style={styles.container}>
        {renderLoading()}
      </div>
    );
}

const styles = {
  container: {
    flex: 1,
    height: '100%',
  },
};

ChatUI.childContextTypes = {
  getLocale: PropTypes.func,
};

ChatUI.defaultProps = {
  messages: [],
  text: undefined,
  placeholder: DEFAULT_PLACEHOLDER,
  messageIdGenerator: () => uuid.v4(),
  user: {},
  onSend: () => { },
  locale: null,
  timeFormat: TIME_FORMAT,
  dateFormat: DATE_FORMAT,
  isAnimated: false,
  loadEarlier: false,
  onLoadEarlier: () => { },
  isLoadingEarlier: false,
  renderLoading: null,
  renderLoadEarlier: null,
  renderAvatar: undefined,
  showUserAvatar: false,
  onPressAvatar: null,
  renderUsernameOnMessage: false,
  renderAvatarOnTop: false,
  renderBubble: null,
  renderSystemMessage: null,
  onLongPress: null,
  renderMessage: null,
  renderMessageText: null,
  renderMessageImage: null,
  imageProps: {},
  videoProps: {},
  lightboxProps: {},
  textInputProps: {},
  listViewProps: {},
  renderCustomView: null,
  renderDay: null,
  renderTime: null,
  renderFooter: null,
  renderChatFooter: null,
  renderInputToolbar: null,
  renderComposer: null,
  renderActions: null,
  renderSend: null,
  renderAccessory: null,
  onPressActionButton: null,
  bottomOffset: 0,
  minInputToolbarHeight: 44,
  onInputTextChanged: null,
  maxInputLength: null,
  forceGetKeyboardHeight: false,
  inverted: true,
  extraData: null,
  minComposerHeight: MIN_COMPOSER_HEIGHT,
  maxComposerHeight: MAX_COMPOSER_HEIGHT,
};

 
export {
  ChatUI,
  Actions,
  Avatar,
  Bubble,
  SystemMessage,
  MessageImage,
  MessageText,
  Composer,
  Day,
  InputToolbar,
  Spinner,
  Message,
  MessageContainer,
  Send,
  Time,
  utils,
};