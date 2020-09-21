import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleInput = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  handleSend = (event) => {
    event.preventDefault();
    const { handleMessage } = this.props;
    handleMessage(this.state.message);
    this.setState({
      message: '',
    });
  };

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" onChange={this.handleInput} value={this.state.message} />
        <button type="button" onClick={this.handleSend}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
