import React, { Component } from "react";
import searchService from "../services/searchService";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  state = {
    searchValue: "",
    visible: true,
  };

  handleChange = async ({ currentTarget: input }) => {
    this.setState({ searchValue: input.value });
    try {
      const response = await searchService.getUsersAndLessons(input.value);
      if (input.value === "") {
        return this.setState({
          searchValue: "",
          length: "",
          users: "",
          lessons: "",
        });
      }
      this.setState({
        length: response.length,
        users: response.users,
        lessons: response.lessons,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ users: [], lessons: [] });
      }
    }
  };

  chosenResult = () => {
    return this.setState({
      searchValue: "",
      length: "",
      users: "",
      lessons: "",
    });
  };

  doSubmit = (e) => {
    e.preventDefault();
    this.setState({ searchValue: "" });
  };

  render() {
    const { lessons, users, visible, searchValue } = this.state;
    return (
      <div className="search__container">
        <form className="searchBar" onSubmit={this.doSubmit}>
          <input
            type="text"
            className="searchBar-input"
            placeholder="Search for anything"
            onChange={this.handleChange}
            onFocus={() => this.setState({ visible: false })}
            onBlur={() => this.setState({ visible: true })}
          />
          <Link
            className="searchBar-btn"
            to={`/search/${searchValue || "*"}`}
            onClick={this.chosenResult}
          >
            <i className="fas fa-search"></i>
          </Link>
        </form>

        {(lessons || users) && (
          <ul hidden={visible} className="result__list">
            {users.map((user) => (
              <Link
                onClick={this.chosenResult}
                key={user._id}
                to={`/teacher-profile/${user._id}`}
                className="result__list-item"
              >
                <li>
                  <i className="fas fa-user"></i>
                  {user.name}
                </li>
              </Link>
            ))}
            {lessons.map((lesson) => (
              <Link
                onClick={this.chosenResult}
                key={lesson._id}
                to={`/teacher-profile/${lesson.user_id}`}
                className="result__list-item"
              >
                <li>
                  <i className="fas fa-book"></i>
                  {lesson.title}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default SearchBar;
