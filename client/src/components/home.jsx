import React, { Component } from "react";
import GoalsCard from "./goalsCard";
import Review from "./review";
import { imagesUrl } from "../config.json";

import { Link, Redirect } from "react-router-dom";
import userService from "../services/userService";

class Home extends Component {
  state = {};

  goals = [
    {
      key: 1,
      icon: "fas fa-graduation-cap",
      title: "Become a proffesional",
      goal:
        "is there something you always wanna learn but never do? here you can do it in the best way you want",
    },
    {
      key: 2,
      icon: "far fa-question-circle",
      title: "Need some help?",
      goal:
        "Just say what you need help with and our best teacher will send you a message back",
    },
    {
      key: 3,
      icon: "fas fa-search-dollar",
      title: "Want to make some money?",
      goal:
        "if there an subject you good at and know well, sign as a teacher and make some classes and money",
    },
    {
      key: 4,
      icon: "fas fa-users",
      title: "Meet some friend",
      goal:
        "You can find other people and learn with them and enlarge you friend circle",
    },
  ];

  reviews = [
    {
      key: 1,
      photo: `${imagesUrl}/reviews/review1.jpeg`,
      name: "Joen Doe",
      title: "Computer science student",
      country: "USA",
      comment:
        "As a computer science student there are a lot of topic i was stuggle to understant, this side help me to become better and understant better. and the best thing is the cheap price!",
    },
    {
      key: 2,
      photo: `${imagesUrl}/reviews/review2.jpeg`,
      name: "Elizabeth Marly",
      title: "High school senior",
      country: "England",
      comment:
        "Sometimes in school i've got the feeling they dont even care if i know the material, All they want is you to finish. Here i've found a lot of teacher that want you to success sometimes more than you, and they give you all you need to be the best you can be!",
    },
    {
      key: 3,
      photo: `${imagesUrl}/reviews/review3.jpeg`,
      name: "Remona Dolche",
      title: "Bistro chef",
      country: "Italy",
      comment:
        "Sience i was young i have this passion for the kitchen, but not always i was good at this. A year ago i start to take cooking lessons here and since my life had change. today a year after, i just open my first bistro!",
    },
  ];

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/users-home" />;
    return (
      <section className="home__container">
        <div className="video-container">
          <video preload="meta" autoPlay muted loop className="home__video">
            <source
              src="http://localhost:8181/videos/home-header-bg.mp4"
              type="video/mp4"
            />
          </video>
          <div className="header-container">
            <h1 className="header">Become A Pro'f.</h1>
            <h3 className="header-sub">
              The new best way to learn and advenced yourself!
            </h3>
          </div>
        </div>
        <div className="home__goals">
          <h1 className="goals-header">Come and achive your goals.</h1>
          <div className="goals__container">
            {this.goals.map((goal) => (
              <GoalsCard
                key={goal.key}
                icon={goal.icon}
                title={goal.title}
                goal={goal.goal}
              />
            ))}
          </div>
        </div>
        <div className="home__become-student">
          <div className="grid-left half-light-box">
            <h1 className="hhl-title">Come and learn what ever you like</h1>
            <p className="hhl-para">
              In our site yo can find live lesson with the best teachers in
              every subject you like
            </p>
            <Link className="btn btn-blue" to="/signup">
              Become one of our students
            </Link>
          </div>
        </div>
        <div className="home__become-teacher">
          <div className="half-light-box">
            <h1 className="bt__header-main">
              Do you have the pession for teaching?
            </h1>
            <h4 className="bt__header-sub">
              Do you want to make some money on the way?
            </h4>
            <p className="bt__para">
              Come and become one of our teachers and start to teaching some
              other students, just create a lessons and give other people pieces
              of you knowladge. and you even can make some money out of it!
            </p>
            <Link className="btn btn-blue" to="/Signup-teacher">
              Become a Teacher
            </Link>
          </div>
        </div>
        <div className="reviews__container">
          <h1 className="review-title">
            But dont listen to us... listen to our students
          </h1>
          <div className="reviews">
            {this.reviews.map((review) => (
              <Review key={review.key} userReview={review} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
