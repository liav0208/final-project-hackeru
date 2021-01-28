import React from "react";

const Review = ({ userReview }) => {
  return (
    <div className="review">
      <img
        className="review__img"
        src={userReview.photo}
        alt={userReview.name}
      />
      <span className="review__span">{userReview.name}</span>
      <span className="review__span">{userReview.title}</span>
      <span className="review__span">{userReview.country}</span>
      <hr />
      <p className="review__comment">"{userReview.comment}"</p>
    </div>
  );
};

export default Review;
