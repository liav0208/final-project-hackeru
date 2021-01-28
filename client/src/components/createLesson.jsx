import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";

class CreateLesson extends Form {
  state = {
    data: {
      title: "",
      description: "",
      duration: "",
      price: "",
      lessonType: "private",
      topic: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().min(6).max(100).required(),
    description: Joi.string().min(6).max(1024).required(),
    duration: Joi.number().min(45).required(),
    price: Joi.number().min(40).max(100).allow("").required(),
    lessonType: Joi.string().valid("private", "group", "open-class").required(),
    topic: Joi.string()
      .valid(
        "Computer and machines",
        "School subjects",
        "Sport",
        "Cooking",
        "Hobbies",
        "Other"
      )
      .required(),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    try {
      await http.post(`${apiUrl}/lessons/create-lesson`, data);
      toast("Lesson created successfully");
      this.props.history.replace("/user-management/my-lessons");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { title: "Title is taken" } });
      }
    }
  };

  render() {
    return (
      <div className="create-lesson">
        <div className="create-lesson__text">
          <div className="text-container">
            <h1 className="title">
              Create a card for your lesson and get more students!
            </h1>
            <p className="para">
              Note that your lessons cards are the stuff how get people to your
              profile!
              <br />
              Please pay attention for what you write.
            </p>
          </div>
        </div>
        <div className="create-lesson__form">
          <form
            className="form"
            onSubmit={this.handleSubmit}
            autoComplete="off"
            method="POST"
          >
            <div className="form__raw form-textarea">
              {this.renderInput("title", "Title")}
              {this.renderTextarea("description", "Description")}
            </div>
            <div className="form__raw">
              {this.renderInput("duration", "Duration", "number")}
              {this.renderInput("price", "Price", "number")}
            </div>
            <div className="form__raw">
              {this.renderSelect("lessonType", [
                "Select lesson type",
                "private",
                "group",
                "open-class",
              ])}
              {this.renderSelect("topic", [
                "Select topic",
                "Computer and machines",
                "School subjects",
                "Sport",
                "Cooking",
                "Hobbies",
                "Other",
              ])}
            </div>
            {this.renderButton("Create Lesson")}
          </form>
        </div>
      </div>
    );
  }
}

export default CreateLesson;
