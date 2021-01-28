import React, { Component } from "react";
import messageService from "../services/messageService";
import moment from "moment";

class Outbox extends Component {
  _isMounted = false;
  state = {
    skip: 0,
    disableNext: false,
    disablePrev: true,
  };

  handleNextButton = async () => {
    const cloneState = { ...this.state };
    cloneState.skip = cloneState.skip + 5;

    const messages = await messageService.getOutboxMessages(5, cloneState.skip);
    this.setState({ skip: cloneState.skip, messages, disablePrev: false });
    if (messages.length < 5) return this.setState({ disableNext: true });
  };

  handlePrevButton = async () => {
    const cloneState = { ...this.state };
    cloneState.skip = cloneState.skip - 5;
    const messages = await messageService.getOutboxMessages(5, cloneState.skip);
    if (cloneState.skip === 0) {
      return this.setState({ disablePrev: true, messages });
    }
    this.setState({ skip: cloneState.skip, messages, disableNext: false });
  };

  async componentDidMount() {
    this._isMounted = true;
    const { skip } = this.state;
    try {
      const messages = await messageService.getOutboxMessages(4, skip);
      if (this._isMounted) {
        this.setState({ messages });
        if (messages.length < 5) this.setState({ disableNext: true });
      }
    } catch (ex) {
      if (ex) {
        console.log("No messages");
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { messages, disableNext, disablePrev } = this.state;
    return (
      <div className="outbox">
        {!messages && <h1 className="no-message">No messages</h1>}
        {messages &&
          messages.map((message) => (
            <div className="messages__container" key={message._id}>
              <span className="message__span">{message.title}</span>
              <span className="message__span">
                <b>To: </b> {message.toName}
              </span>
              <span className="message__date">
                {moment(message.createdAt).calendar()}
              </span>

              <div className="message__content">{message.body}</div>
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

export default Outbox;
