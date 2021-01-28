import React from "react";
import { Link } from "react-router-dom";
import { imagesUrl } from "../config.json";
import moment from "moment";

const LessonCard = ({
  lesson,
  handleDeleteLesson,
  showManageButton,
  sendToProfile,
}) => {
  const frontCardImage = {
    backgroundImage: `url(${imagesUrl}/lesson-images/${lesson.bgImage})`,
  };

  return (
    <div className="lesson">
      <div className="lesson__side lesson__side-front" style={frontCardImage}>
        <div className="front">
          <h1 className="front__header">{lesson.title}</h1>
          <ul className="front__list">
            <li className="front__list-item">
              <b>Teacher: </b> {lesson.teacher}
            </li>
            <hr />
            <li className="front__list-item">
              <b>Topic:</b> {lesson.topic}
            </li>
            <hr />
            <li className="front__list-item">
              <b>Duration:</b> {lesson.duration} Min
            </li>
            <hr />
            <li className="front__list-item">
              <b>Price:</b> {lesson.price}$
            </li>
            <hr />
            <li className="front__list-item">
              <b>Lesson Type: </b> {lesson.lessonType}
            </li>
            <hr />
            <li className="front__list-item">
              <b>Created At: </b> {moment(lesson.createAt).calendar()}
            </li>
          </ul>
        </div>
      </div>
      <div className="lesson__side lesson__side-back">
        <p className="description">
          <b>Description: </b>"{lesson.description}"
        </p>
        {showManageButton && (
          <div className="bottom-link">
            <Link
              to={`/user-management/update-lesson/${lesson._id}`}
              className="lc__edit"
            >
              <i className="fas fa-edit"></i>
              Edit
            </Link>
            <span className=".hm-4"> |</span>
            <button href="/" className="lc__btn" onClick={handleDeleteLesson}>
              <i className="fas fa-trash"></i>
              Delete
            </button>
          </div>
        )}
        {sendToProfile && (
          <div className="bottom-link">
            <Link
              to={`/teacher-profile/${lesson.user_id}`}
              className="lc__edit"
              style={{ color: "goldenrod" }}
            >
              Go to teacher profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
