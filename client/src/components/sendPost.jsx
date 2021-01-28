import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import blogService from "../services/blogService";

class SendPost extends Form {
  state = {
    data: {
      title: "",
      body: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().min(6).max(60).required(),
    body: Joi.string().min(10).max(1000).required(),
  };

  // set what will happen when submitted
  doSubmit = async (e) => {
    const { data } = this.state;
    await blogService.createMessage(data);
    toast("Posted successfully");
    this.props.toggleMessanger();
  };

  render() {
    const { visible, toggleMessanger } = this.props;
    let display = visible ? "visible" : "hidden";
    return (
      <div className="message" style={{ visibility: display }}>
        <button className="cancel-btn" onClick={toggleMessanger}>
          X
        </button>
        <div className="message__container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderTextarea("body", "Content")}
            {this.renderButton("Send")}
          </form>
        </div>
      </div>
    );
  }
}

export default SendPost;
