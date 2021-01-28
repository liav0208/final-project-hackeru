import React, { Component } from "react";
import blogService from "../services/blogService";
import userService from "../services/userService";
import Post from "./blogPost";
import SendMessage from "./sendMessage";
import SendPost from "./sendPost";

class Blog extends Component {
  state = {
    showNext: false,
    showPrevious: true,
    showMessanger: false,
    showCreatePost: false,
    skip: 0,
  };

  
  toggleCreatePost = async () => {
    const cloneState = { ...this.state };
    cloneState.showCreatePost = !cloneState.showCreatePost;
    const messages = await blogService.getAllMessages(cloneState.skip);
    this.setState({ showCreatePost: cloneState.showCreatePost, messages });
  };

  //handle the sending message window
  toggleMessanger = ({ target }) => {
    const clonseState = { ...this.state };
    clonseState.showMessanger = !clonseState.showMessanger;
    if (target.id) this.setState({ senderId: target.id });
    this.setState({
      showMessanger: clonseState.showMessanger,
    });
  };

  handleNext = async () => {
    const cloneState = { ...this.state };
    cloneState.skip = cloneState.skip + 4;
    try {
      const messages = await blogService.getAllMessages(cloneState.skip);

      // check if there more messages
      if (messages.length > 0) {
        this.setState({ skip: cloneState.skip, messages, showPrevious: false });
        if (messages.length < 4) this.setState({ showNext: true });
      } else {
        this.setState({ showNext: true });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ showNext: true });
      }
    }
  };

  handlePrevious = async () => {
    const cloneState = { ...this.state };
    cloneState.skip = cloneState.skip - 4;
    const messages = await blogService.getAllMessages(cloneState.skip);
    if (cloneState.skip === 0) {
      return this.setState({
        showPrevious: true,
        messages,
        skip: cloneState.skip,
        showNext: false,
      });
    }
    this.setState({ skip: cloneState.skip, messages, disableNext: false });
  };

  async componentDidMount() {
    const { skip } = this.state;
    const user = await userService.getUserDetails();
    const messages = await blogService.getAllMessages(skip);
    this.setState({ messages, user });
  }

  render() {
    const {
      messages,
      showNext,
      showPrevious,
      user,
      showMessanger,
      senderId,
      showCreatePost,
    } = this.state;
    return (
      <div className="blog__container">
        <SendPost
          visible={showCreatePost}
          toggleMessanger={this.toggleCreatePost}
        />
        <SendMessage
          visible={showMessanger}
          toggleMessanger={this.toggleMessanger}
          senderId={senderId && senderId}
        />
        <div className="blog__header-container">
          <h1 className="blog__title">
            Welcome to our blog, if you dont find what you look for, here you
            have a change to find it!
          </h1>
        </div>

        <div className="messages__container">
          <button
            className="btn btn-blue btn-create"
            onClick={this.toggleCreatePost}
          >
            Create Post
          </button>
          <h1 className="message__header">See all posts</h1>
          {messages &&
            messages.map((message) => (
              <Post
                key={message._id}
                message={message}
                user={user}
                toggleMessanger={this.toggleMessanger}
              />
            ))}
          <div className="blog__btn-container">
            <button
              className="btn blog-previous"
              onClick={this.handlePrevious}
              disabled={showPrevious}
            >
              Previous
            </button>
            <button
              className="btn blog-next"
              disabled={showNext}
              onClick={this.handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
