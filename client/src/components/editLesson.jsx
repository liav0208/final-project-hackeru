import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import lessonService from "../services/lessonSevice";

class EditLesson extends Form {
  _isMounted = false;
  state = {
    data: {},
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
    const lessonId = this.props.match.params.id;
    const { data } = this.state;
    try {
      await lessonService.editLesson(lessonId, data);
      toast("Lesson was updated");
      this.props.history.replace("/user-management/my-lessons");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { title: "Title is taken" } });
      }
    }
  };

  mappingLesson(lesson) {
    return {
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      price: lesson.price,
      lessonType: lesson.lessonType,
      topic: lesson.topic,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const lessonId = this.props.match.params.id;
    let data = await lessonService.getLessonById(lessonId);
    data = this.mappingLesson(data);
    if (this._isMounted) this.setState({ data });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="edit-lesson">
        <h1>Edit your lesson card!</h1>
        <div className="edit-lesson__form">
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
            {this.renderButton("Edit Lesson")}
          </form>
        </div>
      </div>
    );
  }
}

export default EditLesson;
