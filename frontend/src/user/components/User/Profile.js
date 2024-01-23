import React from "react";
import styles from "./Profile.module.css";

const Profile = (props) => {
  return (
    <section className={styles["user-container"]}>
      <div className={styles["user-profile"]}>
        <img
          src={`http://localhost:5000/${props.userData.image}`}
          className={styles["user-avatar"]}
          alt={`${props.userData.name} avatar`}
        />

        <div className={styles["user-data"]}>
          <div className={styles["user-detail"]}>
            <p className={styles["user-label"]}>User id:</p>
            <p className={styles["user-description"]}>
              {props.userData._id}
            </p>
          </div>

          <div className={styles["user-detail"]}>
            <p className={styles["user-label"]}>Name:</p>
            <span className={styles["user-description"]}>
              {props.userData.name}
            </span>
          </div>

          <div className={styles["user-detail"]}>
            <p className={styles["user-label"]}>Surname:</p>
            <p className={styles["user-description"]}>
              {props.userData.surname}
            </p>
          </div>

          <div className={styles["user-detail"]}>
            <p className={styles["user-label"]}>Email</p>
            <p className={styles["user-description"]}>{props.userData.email}</p>
          </div>

          <div className={styles["user-detail"]}>
            <p className={styles["user-label"]}>
              Favorites:{" "}
              <span className={styles["user-description"]}>
                {props.userData.favorites.length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
