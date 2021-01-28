import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const TeacherCard = ({ teacher }) => {
  return (
    <div className="teacher-card">
      <div className="top-card">
        <div className="top-card__text">
          <h1 className="teacher-name">{teacher.name}</h1>
          <span className="teacher-span">
            <b>Age: </b>
            {moment().diff(teacher.dateOfBirth, "years")}
          </span>
          <span className="teacher-span">
            <i className="fas fa-users"></i>
            {teacher.followerStudents.length}
          </span>
          <span className="teacher-span">{teacher.academicInstitution}</span>
        </div>
        <img
          className="teacher-photo"
          src={`http://localhost:8181/images/users/${teacher.userPhoto}`}
          alt={teacher.name}
        />
      </div>
      <hr />
      <div className="bottom-card">
        <p className="teacher-about">
          <b>About: </b> "{teacher.about.slice(0, 150)}..."
        </p>
        <Link className="teacher-link" to={`/teacher-profile/${teacher._id}`}>
          Visit profile
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
