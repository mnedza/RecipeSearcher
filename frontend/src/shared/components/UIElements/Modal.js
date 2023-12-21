import React from "react";

import styles from "./Modal.module.css";

const Modal = ({ message, onClear, onConfirm }) => {
  return (
    <>
      <div className={styles.backdrop} onClick={onClear}></div>
      <div className={styles["modal-content"]}>
        <p className={styles["modal-message"]}>{message}</p>
        <button className={styles["close-btn"]} onClick={onClear}>
          Close
        </button>
        <button className={styles["confirm-btn"]} onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default Modal;
