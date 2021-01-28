import React, { Component } from "react";
import userService from "../services/userService";
import TeacherCard from "./teacherCard";

class FavoriteTeacher extends Component {
  _isMounted = false;
  state = {};

  async componentDidMount() {
    this._isMounted = true;
    const { favoriteTeachers } = await userService.getUserDetails();
    const teachers = await userService.getFavoriteTeachers();

    if (this._isMounted)
      this.setState({
        favoriteTeachers,
        teachers,
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { teachers } = this.state;
    return (
      <div className="favorite-techers">
        <header className="favorite-techers__header">
          <h1 className="title">My Favorite Teachers</h1>
        </header>
        <div className="favorite-techers__container">
          {teachers &&
            teachers.map((teacher) => (
              <TeacherCard key={teacher._id} teacher={teacher} />
            ))}
        </div>
      </div>
    );
  }
}

export default FavoriteTeacher;
