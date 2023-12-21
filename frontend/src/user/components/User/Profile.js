import React from "react";
import styles from "./Profile.module.css";

const Profile = (props) => {
  return (
    <section className={styles.section}>
      <div className={styles["user-container"]}>
        <h1 className={styles["user-title"]}>Your Profile</h1>
        <div className={styles["user-profile"]}>
          <img
            src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
            className={styles["user-avatar"]}
            alt={`${props.userData.name} avatar`}
          />

          <div className={styles["user-data"]}>
            <p className={styles["user-detail"]}>
              User id: {props.userData._id}
            </p>
            <p className={styles["user-detail"]}>Name: {props.userData.name}</p>
            <p className={styles["user-detail"]}>
              Surname: {props.userData.surname}
            </p>
            <p className={styles["user-detail"]}>
              Email: {props.userData.email}
            </p>
            <p className={styles["user-detail"]}>
              Favorites: {props.userData.favorites.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
