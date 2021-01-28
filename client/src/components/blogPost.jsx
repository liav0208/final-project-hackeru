import React, { Component } from "react";
import moment from "moment";

class Post extends Component {
  state = {};

  componentDidMount() {
    const { user, message } = this.props;
    const style = { ...this.state.style };
    for (let ob in user.favMessages) {
      if (user.favMessages[ob] === message._id) {
        style.color = "orange";
        this.setState({ style });
      }
    }
  }

  render() {
    const { message, toggleMessanger } = this.props;

    return (
      <div className="post">
        <h1 className="post__title">{message.title}</h1>
        <span className="post__date">
          <b>Posted At: </b>
          {moment(message.createdAt).calendar()}
        </span>
        <span className="post__author">
          <b>Author: </b> {message.author}
        </span>
        <hr className="post__hr" />
        <p className="post__body">{message.body}</p>
        <div className="post__respond">
          <button
            className="btn btn-blue"
            id={message.user_id}
            onClick={toggleMessanger}
          >
            Send user message
          </button>
        </div>
      </div>
    );
  }
}

export default Post;
