import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import userService from "../services/userService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class Signup extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      dateOfBirth: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(2).max(144).label("Name"),
    email: Joi.string().min(6).max(1024).email().label("Email"),
    password: Joi.string().min(6).max(1024).label("Password"),
    passwordConfirm: Joi.string()
      .min(6)
      .max(1024)
      .label("Password Confirm")
      .required(),

    dateOfBirth: Joi.date().required(),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.role = "student";
    try {
      await http.post(`${apiUrl}/users/signup`, data);
      toast("You signed up successfully");
      this.props.history.replace("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        if (ex.response.data === '"passwordConfirm" must be [ref:password]') {
          return this.setState({
            errors: { passwordConfirm: "Passwords are not equal" },
          });
        }
        this.setState({ errors: { email: ex.response.message } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="signup__container">
        <div className="signup__content">
          <h1 className="signup__content-title">
            Find all of the best teachers in one place and increase your
            abillity.
          </h1>
          <ul className="signup__content-list">
            <li className="signup__content-item">
              <span className="bullet"></span>
              Cheap lesson
            </li>
            <li className="signup__content-item">
              <span className="bullet"></span>3 options for lessons
            </li>
            <li className="signup__content-item">
              <span className="bullet"></span> More than 10 languge
            </li>
            <li className="signup__content-item">
              <span className="bullet"></span>
              World best teachers
            </li>
            <li className="signup__content-item">
              <span className="bullet"></span>
              You can see your lesson later to remember
            </li>
            <li className="signup__content-item">
              <span className="bullet"></span>
              more than 50 topics in one place
            </li>
          </ul>
        </div>
        <div className="signup__form">
          <form
            className="form"
            autoComplete="off"
            onSubmit={this.handleSubmit}
            method="POST"
          >
            <i className="form-icon fas fa-user"></i>
            <div className="form__raw">
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email", "email")}
            </div>
            <div className="form__raw">
              {this.renderInput("password", "Password", "password")}
              {this.renderInput(
                "passwordConfirm",
                "Password Confirm",
                "password"
              )}
            </div>
            <div className="form__date">
              {this.renderInput("dateOfBirth", "Birth Date", "date")}
            </div>
            {this.renderButton("Signup")}
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
