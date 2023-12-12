import React from "react";
import styles from "./ErrorModal.module.css";

const ErrorModal = ({ error, onClear }) => {
  if (!error) {
    return null;
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClear}></div>
      <div className={styles["modal-content"]}>
        <p className={styles["error-message"]}>{error}</p>
        <button className={styles["close-btn"]} onClick={onClear}>
          Close
        </button>
      </div>
    </>
  );
};

export default ErrorModal;
