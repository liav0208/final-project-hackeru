import React from "react";

const GoalsCard = ({ icon, title, goal }) => {
  return (
    <div className="card__container">
      <i className={icon}></i>
      <h1 className="card__container-title">{title}</h1>
      <p className="card__container-goal">{goal}</p>
    </div>
  );
};

export default GoalsCard;
