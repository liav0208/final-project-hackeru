import React, { Component } from "react";
import lessonService from "../services/lessonSevice";
import LessonCard from "./lessonCard";
import Swal from "sweetalert2";


class MyLessons extends Component {
  _isMounted = false;
  state = {};

  handleDeleteLesson = async (lessonId) => {
    let lessons = [...this.state.lessons];
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-blue",
        cancelButton: "btn btn-swal-red",
      },
      buttonsStyling: false,
    });

    const SwalResponse = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "cancel",
      reverseButtons: true,
    });
    if (SwalResponse.isDismissed) return;

    lessons = lessons.filter((lesson) => lesson._id !== lessonId);
    this.setState({ lessons });
    await lessonService.deleteLesson(lessonId);
  };

  async componentDidMount() {
    this._isMounted = true;
    try {
      const lessons = await lessonService.getMyLessons();
      if (this._isMounted) this.setState({ lessons });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.message);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { lessons } = this.state;
    return (
      <div className="myLessons__container">
        {!lessons && <h1 className="no-lessons">No Lessons yet</h1>}
        {lessons &&
          lessons.map((lesson) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              handleDeleteLesson={() => this.handleDeleteLesson(lesson._id)}
              showManageButton={true}
            />
          ))}
      </div>
    );
  }
}

export default MyLessons;
