import React, { Component } from "react";
import userService from "../services/userService";
import lessonService from "../services/lessonSevice";
import TeacherCard from "./teacherCard";
import LessonCard from "./lessonCard";

import { Link } from "react-router-dom";

class UsersHome extends Component {
  _isMounted = false;
  state = {
    teachers: [],
    favTeachers: [],
    skip: 4,
  };

  async componentDidMount() {
    this._isMounted = true;
    const { skip } = this.state;
    const teachers = await userService.getTeachersUser();
    const favTeachers = await userService.getMostLikedTeachers();
    const { lessons } = await lessonService.getLessons(null, 4, skip);
    if (this._isMounted) {
      this.setState({ teachers, favTeachers, lessons });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { user } = this.props;
    const { teachers, favTeachers, lessons } = this.state;
    return (
      <div className="uh__container">
        <div className="uh__header">
          <div className="uh__header-text">
            <h1 className="uh__title">Welcome Back {user && user.name}!</h1>
            <p className="uh__main-para">
              Its time to learn and become one of the best!
            </p>
          </div>
          <img
            src="http://localhost:8181/images/user-home-main.jpeg"
            alt="home img"
            className="uh__header-img"
          />
        </div>
        <section className="home__section">
          <h1 className="section-header">Last New teachers</h1>
          <div className="new-teachers">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        </section>
        <section className="home__section">
          <h1 className="section-header">Most Popular Teachers</h1>
          <div className="new-teachers">
            {favTeachers.slice(0, 4).map((teacher) => (
              <TeacherCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        </section>
        <section className="home__section">
          <h1 className="section-header">Top New Lessons</h1>
          <div className="home__lessons">
            {lessons &&
              lessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  sendToProfile={true}
                />
              ))}
          </div>
        </section>
        <section className="home__blog">
          <h1 className="home__blog-title">
            Want to learn something and dont find a teacher for it?
          </h1>
          <p className="home__blog-para">
            Try to post on our blog the thing you wanna learn and one of our
            teacher may answear you!
          </p>
          <Link className="home__blog-link btn btn-blue" to="/blog">
            Go to blog
          </Link>
        </section>
      </div>
    );
  }
}

export default UsersHome;
