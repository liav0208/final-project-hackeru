import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import userService from "../services/userService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class SignupTeacher extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      academicInstitution: "",
      about: "",
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

    academicInstitution: Joi.string().min(3).max(200).required(),
    about: Joi.string().required().min(10).max(1000),
    dateOfBirth: Joi.date().required(),
  };

  doSubmit = async (event) => {
    const data = { ...this.state.data };
    data.role = "teacher";

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
            Share your knowladge with other people and become a teacher
          </h1>
          <ul className="signup__content-list">
            <li className="signup__content-item">
              <span className="bullet"></span>
              Make money out of that
            </li>
            <li className="signup__content-item">
              <span className="bullet"></span>Choose when and what
            </li>
            <li className="signup__content-item">
              <span className="bullet"></span> Best practice for you either
            </li>
            <li className="signup__content-item">
              <span className="bullet"></span>
              Become a better teacher
            </li>
          </ul>
        </div>
        <div className="signup__form">
          <form
            action="/upload"
            className="form"
            autoComplete="off"
            onSubmit={(e) => this.handleSubmit(e)}
            method="POST"
          >
            <i className="form-icon fas fa-chalkboard-teacher"></i>
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
            <div className="form__raw form-textarea">
              {this.renderInput("academicInstitution", "Academic Institution")}
              {this.renderTextarea("about", "Tell us about yourself")}
            </div>
            <div className="form__date">
              {this.renderInput("dateOfBirth", "Birth Date", "date")}
            </div>
            {this.renderButton("Become a teacher")}
          </form>
        </div>
      </div>
    );
  }
}

export default SignupTeacher;
