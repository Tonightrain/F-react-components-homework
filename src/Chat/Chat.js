import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleMessage = (input) => {
    const message = {
      text: input,
      role: 'CUSTOMER',
    };
    const messages = this.state.messages.concat(message);

    setTimeout(() => {
      this.setState(
        {
          messages,
        },
        () => this.handleAnswer(input)
      );
    }, 10);
  };

  handleAnswer = (input) => {
    answersData.forEach((answer) => {
      answer.tags.some((tag) => {
        if (input.indexOf(tag) !== -1) {
          const messages = this.state.messages.concat(answer);
          setTimeout(() => {
            this.setState({
              messages,
            });
          }, 1000);
        }
        return true;
      });
    });
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleMessage={this.handleMessage} />
      </main>
    );
  }
}

export default Chat;
