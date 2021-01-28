import React, { Component } from "react";
import searchService from "../services/searchService";
import LessonCard from "./lessonCard";


class SearchResult extends Component {
  state = {};

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.query !== prevProps.match.params.query) {
      const params = this.props.match.params;
      const lessons = await searchService.findLessonByQuery(params);
      this.setState({ lessons });
      console.log(lessons);
    }
  }

  async componentDidMount() {
    const params = this.props.match.params;
    const lessons = await searchService.findLessonByQuery(params);
    this.setState({ lessons });
  }

  render() {
    const { lessons } = this.state;
    const { query } = this.props.match.params;
    return (
      <div className="results">
        <div className="results__header">
          {lessons && (
            <h1 className="results__header-title">
              {query !== "*"
                ? `${lessons.length} Result for "${query}"`
                : `${lessons.length} Results`}
            </h1>
          )}
        </div>
        <div className="results__lessons">
          {lessons &&
            lessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                sendToProfile={true}
                lesson={lesson}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default SearchResult;
