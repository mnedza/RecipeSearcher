import React from "react";

import styles from "./Home.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  return (
    <div className={`${styles["home-container"]} section`}>
      <h1>Welcome to the Recipe Search App</h1>
      <h2>Wanna search for some recipes?</h2>
      <Link to="/search">search now</Link>
    </div>
  );
};

export default Home;
