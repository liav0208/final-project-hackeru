import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";

import ProtectedRoute from "./common/protectedRoute";
import EditTeacherProfile from "./editTeacherProfile";
import EditStudentProfile from "./editStudentProfile";
import UploadImage from "./uploadImage";
import FavoriteTeacher from "./favoriteTeachers";
import CreateLesson from "./createLesson";
import MyLessons from "./myLessons";
import EditLesson from "./editLesson";
import UserManagementHome from "./userManagementHome";


class UserManagmenet extends Component {
  state = {};

  render() {
    const { user } = this.props;
    const { url } = this.props.match;
    return (
      <div className="user-management">
        <nav className="sidenav">
          <ul className="sidenav__list">
            <li className="sidenav__item">
              {user && user.role === "student" && (
                <NavLink
                  to={`${url}/edit-student-profile`}
                  className="sidenav__link"
                >
                  Edit Profile
                </NavLink>
              )}
              {user && user.role === "teacher" && (
                <NavLink
                  to={`${url}/edit-teacher-profile`}
                  className="sidenav__link"
                >
                  Edit Profile
                </NavLink>
              )}
            </li>
            <li className="sidenav__item">
              <NavLink to={`${url}/upload-photo`} className="sidenav__link">
                Upload Profile Image
              </NavLink>
            </li>
            <li className="sidenav__item">
              <NavLink
                to={`${url}/favorite-teachers`}
                className="sidenav__link"
              >
                Favorite Teachers
              </NavLink>
            </li>
            {user && user.role === "teacher" && (
              <React.Fragment>
                <li className="sidenav__item">
                  <NavLink
                    to={`${url}/create-lesson`}
                    className="sidenav__link"
                  >
                    Create Lesson
                  </NavLink>
                </li>
                <li className="sidenav__item">
                  <NavLink to={`${url}/my-lessons`} className="sidenav__link">
                    My Lessons
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
        <main>
          <Switch>
            <Route
              path={`${url}/edit-teacher-profile`}
              component={EditTeacherProfile}
            />
            <Route
              path={`${url}/edit-student-profile`}
              component={EditStudentProfile}
            />
            <Route
              path={`${url}/upload-photo`}
              component={(props) => <UploadImage user={user} props={props} />}
            />
            <Route
              path={`${url}/favorite-teachers`}
              component={FavoriteTeacher}
            />
            <ProtectedRoute
              path={`${url}/create-lesson`}
              component={CreateLesson}
              role="true"
            />
            <ProtectedRoute
              path={`${url}/my-lessons`}
              component={MyLessons}
              role="true"
            />
            <ProtectedRoute
              path={`${url}/update-lesson/:id`}
              component={EditLesson}
              role="true"
            />
            <Route
              path="/"
              component={() => <UserManagementHome user={user} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default UserManagmenet;
