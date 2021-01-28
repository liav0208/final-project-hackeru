import React, { Component } from "react";
import messageService from "../services/messageService";
import moment from "moment";
import SendMessage from "./sendMessage";

class Inbox extends Component {
  _isMounted = false;
  state = {
    showMessanger: false,
    disableNext: false,
    disablePrev: true,
    skip: 0,
  };

  toggleMessanger = ({ target }) => {
    const clonseState = { ...this.state };
    clonseState.showMessanger = !clonseState.showMessanger;
    if (target.id) this.setState({ senderId: target.id });
    this.setState({
      showMessanger: clonseState.showMessanger,
    });
  };

  handleNextButton = async () => {
    const cloneState = { ...this.state };
    cloneState.skip = cloneState.skip + 5;
    try {
      const messages = await messageService.getInboxMessages(cloneState.skip);
      this.setState({ skip: cloneState.skip, messages, disablePrev: false });
      if (messages.length < 5) return this.setState({ disableNext: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ disableNext: true });
      }
    }
  };

  handlePrevButton = async () => {
    const cloneState = { ...this.state };
    cloneState.skip = cloneState.skip - 5;
    const messages = await messageService.getOutboxMessages(5, cloneState.skip);
    if (cloneState.skip === 0) {
      return this.setState({
        disablePrev: true,
        messages,
        skip: cloneState.skip,
        disableNext: false,
      });
    }
    this.setState({ skip: cloneState.skip, messages, disableNext: false });
  };

  async componentDidMount() {
    this._isMounted = true;
    const { skip } = this.state;
    try {
      const messages = await messageService.getInboxMessages(skip);
      if (this._isMounted) {
        this.setState({ messages });
        if (messages.length < 5) this.setState({ disableNext: true });
      }
    } catch (ex) {
      if (ex) {
        return;
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      messages,
      showMessanger,
      senderId,
      disableNext,
      disablePrev,
    } = this.state;
    return (
      <div className="inbox">
        <SendMessage
          visible={showMessanger}
          toggleMessanger={this.toggleMessanger}
          senderId={senderId && senderId}
        />
        {!messages && <h1 className="no-message">No messages</h1>}
        {messages &&
          messages.map((message) => (
            <div className="messages__container" key={message._id}>
              <span className="message__span">{message.title}</span>
              <span className="message__span">
                <b>From: </b> {message.fromName}
              </span>
              <span className="message__date">
                {moment(message.createdAt).calendar()}
              </span>

              <div className="message__content">{message.body}</div>
              <button
                className="replay btn"
                id={message.from}
                onClick={(e) => this.toggleMessanger(e)}
              >
                <i className="fas fa-paper-plane"></i>
                Replay
              </button>
            </div>
          ))}

        {messages && (
          <div className="buttons">
            <button
              disabled={disablePrev}
              className="btn"
              onClick={this.handlePrevButton}
            >
              Previous
            </button>
            <button
              disabled={disableNext}
              className="btn"
              onClick={this.handleNextButton}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Inbox;
