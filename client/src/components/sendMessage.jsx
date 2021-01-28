import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import messageService from "../services/messageService";

class SendMessage extends Form {
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

  handleSending = () => {
    let data = { ...this.state.data };
    data = {
      title: "",
      body: "",
    };
    this.setState({ data });
  };

  // set what will happen when submitted
  doSubmit = async (e) => {
    e.preventDefault();
    const { toggleMessanger } = this.props;
    const data = { ...this.state.data };
    data.senderId = this.props.senderId;
    console.log(data);
    try {
      await messageService.sendMessage(data);
      toast("Message send successfully");
      toggleMessanger(e);
      this.handleSending();
    } catch (ex) {
      if (ex.response && ex.response.code === 400) {
        this.setState({ errors: { title: "error occured" } });
      }
    }
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
          <form autoComplete="off" onSubmit={(e) => this.doSubmit(e)}>
            {this.renderInput("title", "Title")}
            {this.renderTextarea("body", "Content")}
            {this.renderButton("Send")}
          </form>
        </div>
      </div>
    );
  }
}

export default SendMessage;
