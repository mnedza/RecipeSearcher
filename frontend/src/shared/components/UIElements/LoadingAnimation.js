import React from "react";

import Card from "./Card";

import styles from "./LoadingAnimation.module.css";

const LoadingAnimation = () => {
  return (
    <Card>
      <p className={styles["loading-text"]}>Loading</p>
    </Card>
  );
};

export default LoadingAnimation;
