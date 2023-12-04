import React from "react";

import styles from "./UserInfo.module.css";

const UserInfo = (props) => {
  return (
    <section className={styles.section}>
      <div className={styles["user-container"]}>
        <h1 className={styles["user-title"]}>Your Profile</h1>
        <div className={styles["user-profile"]}>
          <img
            src={props.userData.avatar}
            className={styles["user-avatar"]}
            alt={`${styles.name} avatar`}
          />
          <div className={styles["user-data"]}>
            <p className={styles["user-detail"]}>
              User id: {props.userData.userId}
            </p>
            <p className={styles["user-detail"]}>Name: {props.userData.name}</p>
            <p className={styles["user-detail"]}>
              Email: {props.userData.email}
            </p>
            <p className={styles["user-detail"]}>
              Favorites: {props.userData.recipes}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
