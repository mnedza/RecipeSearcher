import React from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.css";
import databasePicture from "../../../images/database.jpg";
import favoritesPicture from "../../../images/favorites.jpg";

const Home = () => {
  return (
    <div className={`${styles["home-container"]} section`}>
      <h1>
        <span className={styles["highlight-text"]}>RecipeSearcher</span>
      </h1>
      <h2 className={styles["subtitle"]}>
        Discover a world of delicious recipes at your fingertips!
      </h2>
      <p className={styles["paragraph"]}>
        Welcome to the world of culinary discovery! Whether you're a seasoned
        chef or just starting out, we're here to help make your recipe search
        fast and fun. Get to it!
      </p>
      <div className={styles["cta-container"]}>
        <Link to="/search" className={styles["cta-button"]}>
          Start Exploring
        </Link>
      </div>
      <div className={styles["features-container"]}>
        <div className={styles["feature"]}>
          <h3 className={styles["feature-title"]}>Extensive Recipe Database</h3>
          <p className={styles["feature-paragraph"]}>
            Browse through a vast collection of recipes for every occasion.
          </p>
          <img
            src={databasePicture}
            alt="Feature 1"
            className={styles["feature-image"]}
          />
        </div>
        <div className={styles["feature"]}>
          <h3 className={styles["feature-title"]}>Save Your Favorites</h3>
          <p className={styles["feature-paragraph"]}>
            Save your favorite recipes to revisit them whenever you want.
          </p>
          <img
            src={favoritesPicture}
            alt="Feature 2"
            className={styles["feature-image"]}
          />
        </div>
      </div>
      <p className={styles["join-us"]}>
        Ready to embark on a culinary adventure? Join us today and start
        exploring the world of flavors!
      </p>
      <div className={styles["cta-container"]}>
        <Link to="/sign-up" className={styles["cta-button"]}>
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
