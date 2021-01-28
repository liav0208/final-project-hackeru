import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import userService from "../services/userService";
import moment from "moment";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";


class EditStudentProfile extends Form {
  state = {
    data: {},
    errors: {},
  };

  schema = {
    name: Joi.string().min(2).max(144).label("Name"),
    email: Joi.string().min(6).max(1024).email().label("Email"),
    dateOfBirth: Joi.date().required(),
  };

  doSubmit = async () => {
    const { data } = this.state;
    try {
      await userService.updateUser(data);
      toast("User Updated succefully");
      this.props.history.replace("/");
    } catch (ex) {
      console.log("err");
      this.setState({ errors: { email: "Email is taken" } });
    }
  };

  mappingUserDate(obj) {
    return {
      name: obj.name,
      email: obj.email,
      dateOfBirth: moment(obj.dateOfBirth).format("YYYY-MM-DD"),
    };
  }

  async componentDidMount() {
    const userData = this.mappingUserDate(
      await userService.getUserDetails(`${apiUrl}/users/me`)
    );
    this.setState({ data: userData });
  }

  render() {
    return (
      <div className="edit__container">
        <div className="edit__form">
          <form
            className="form"
            autoComplete="off"
            onSubmit={this.handleSubmit}
            method="POST"
          >
           <div className="form__raw">
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email", "email")}
            </div>
            <div className="form__date">
              {this.renderInput("dateOfBirth", "Birth Date", "date")}
            </div>
            {this.renderButton("Edit")}
          </form>
        </div>
      </div>
    );
  }
}

export default EditStudentProfile;
