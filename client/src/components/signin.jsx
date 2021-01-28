import Joi from "joi-browser";
import React from "react";
import Form from "./common/form";
import userService from "./../services/userService";
import { Redirect } from "react-router-dom";


class Signin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().min(6).max(1024).email().label("Email"),
    password: Joi.string().min(6).max(1024).label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.signin(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="signin__container">
        <div className="singin__card">
          <h1 className="signin__title">Sign In</h1>
          <form
            className="signin__form"
            onSubmit={this.handleSubmit}
            autoComplete="off"
            method="POST"
          >
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Sign In")}
          </form>
        </div>
      </div>
    );
  }
}

export default Signin;
