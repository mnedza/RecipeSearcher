import React from "react";
import ReactDOM from "react-dom";

import styles from "./BackDrop.module.css";

const BackDrop = (props) => {
  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={props.onClick}></div>,
    document.querySelector("#backdrop")
  );
};

export default BackDrop;
