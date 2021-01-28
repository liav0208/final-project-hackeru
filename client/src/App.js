import React, { Component } from "react";
import "./main.scss";

import Navbar from "./components/navbar";
import Home from "./components/home";
import Footer from "./components/footer";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import SignupTeacher from "./components/signupTeacher";
import UsersHome from "./components/usersHome";
import Blog from "./components/blog";
import TeacherProfile from "./components/teacherProfile";
import SearchResult from "./components/searchResult";
import Messages from "./components/messages";
import UserManagmenet from "./components/userManagement";
import MobileNavbar from "./components/mobileNavbar";

import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import userService from "./services/userService";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <header>
          <ToastContainer style={{ fontSize: "2rem" }} />
          <Navbar user={user} />
          <MobileNavbar user={user} />
        </header>
        <main className="mh-800">
          <Switch>
            <Route
              path="/messages"
              component={(props) => <Messages {...props} />}
            />
            <Route
              path="/user-management"
              component={(props) => <UserManagmenet user={user} {...props} />}
            />
            <Route
              path="/users-home"
              component={() => <UsersHome user={user} />}
            />

            <Route path="/search/:query" component={SearchResult} />
            <Route path="/teacher-profile/:id" component={TeacherProfile} />
            <Route path="/blog" component={Blog} />
            <Route path="/signup-teacher" exact component={SignupTeacher} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
