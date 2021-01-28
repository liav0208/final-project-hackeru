import React, { Component } from "react";
import userService from "../services/userService";
import lessonService from "../services/lessonSevice";
import moment from "moment";
import LessonCard from "./lessonCard";
import SendMessage from "./sendMessage";

class TeacherProfile extends Component {
  _isMounted = false;
  state = {
    teacherSaved: false,
    showMessanger: false,
  };

  handleSaveButton = async () => {
    const teacherId = this.props.match.params.id;
    const { teacherSaved } = this.state;
    this.setState({ teacherSaved: !teacherSaved });
    try {
      // save or unsave teacher
      await userService.saveteacherToFavorite(teacherId);
      const teacher = await userService.getTeacherDetails(teacherId);
      this.setState({ teacher });
    } catch (err) {
      console.log("err");
    }
  };

  toggleMessanger = () => {
    const cloneState = { ...this.state };
    cloneState.showMessanger = !cloneState.showMessanger;
    this.setState({ showMessanger: cloneState.showMessanger });
  };

  async componentDidMount() {
    this._isMounted = true;
    const userDetails = await userService.getUserDetails();
    const teacherId = this.props.match.params.id;
    const teacher = await userService.getTeacherDetails(teacherId);
    let lessons;
    lessons = await lessonService.getLessonByTeacherId(teacherId);
    userDetails.favoriteTeachers.includes(teacher._id)
      ? this.setState({ teacherSaved: true })
      : this.setState({ teacherSaved: false });
    this.setState({ teacher, lessons, userDetails });
  }

  async componentDidUpdate(prevProps) {
    const teacherId = this.props.match.params.id;
    const { userDetails } = this.state;
    // check if current teacher page is with the same id as the params, else update teacher data
    if (teacherId !== prevProps.match.params.id) {
      const teacher = await userService.getTeacherDetails(teacherId);
      let lessons;
      if (teacher.lessons.length > 0) {
        lessons = await lessonService.getLessonByTeacherId(teacherId);
      }
      //set save button according to user data
      userDetails.favoriteTeachers.includes(teacherId)
        ? this.setState({ teacherSaved: true })
        : this.setState({ teacherSaved: false });

      this.setState({ teacher, lessons });
    }
    this._isMounted = false;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { teacher, lessons, teacherSaved, showMessanger } = this.state;
    return (
      <div className="teacher-profile__container">
        <SendMessage
          visible={showMessanger}
          toggleMessanger={this.toggleMessanger}
          senderId={this.props.match.params.id}
        />
        {teacher && (
          <React.Fragment>
            <header className="header">
              <img
                className="teacher-img"
                src={`http://localhost:8181/images/users/${teacher.userPhoto}`}
                alt={teacher.name}
              />
              <div className="teacher-details">
                <h1>
                  <b>Name: </b> {teacher.name}
                </h1>
                <span className="teacher-span">
                  <b>Age: </b>
                  {moment().diff(teacher.dateOfBirth, "years")} Years Old
                </span>
                <span className="teacher-span">
                  <b>Academic Institution: </b>
                  {teacher.academicInstitution}
                </span>
                <span className="teacher-span">
                  <i className="classname fas fa-users"></i>
                  <b>Followers: </b>
                  {teacher.followerStudents.length}
                </span>
                <span className="teacher-span">
                  <b>About Me: </b>"{teacher.about}"
                </span>
              </div>
              <div className="send-message">
                <h1>Let's start learning!</h1>
                <button
                  className="btn send-message__link"
                  onClick={this.toggleMessanger}
                >
                  <i className="far fa-comment-dots"></i>
                  Send Message
                </button>
                <button
                  onClick={this.handleSaveButton}
                  className="btn send-message__link"
                >
                  {!teacherSaved ? (
                    <React.Fragment>
                      <i className="fas fa-heart"></i>
                      Save to favorite
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <i className="fas fa-heart"></i>
                      Remove from favorite
                    </React.Fragment>
                  )}
                </button>
              </div>
            </header>
            {lessons && (
              <section className="myCard__container">
                {lessons.map((lesson) => (
                  <LessonCard key={lesson._id} lesson={lesson} />
                ))}
              </section>
            )}
            {!lessons && <h1>No lessons yet</h1>}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default TeacherProfile;
